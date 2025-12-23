import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Import and check Supabase client
    const { supabase } = await import('@/lib/supabase')
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Server configuration error: Supabase is not properly configured. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Sign in with Supabase Auth
    let authData: any = null
    let authError: any = null
    
    const signInResult = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    authData = signInResult.data
    authError = signInResult.error

    // If login fails due to email not confirmed, auto-confirm and retry
    if (authError && (authError.message?.toLowerCase().includes('email not confirmed') || authError.message?.toLowerCase().includes('email_not_confirmed'))) {
      try {
        // Auto-confirm the email using admin client
        const { createAdminClient } = await import('@/lib/supabase')
        const adminClient = createAdminClient()
        
        // Get user by email from admin API
        const { data: { users }, error: listError } = await adminClient.auth.admin.listUsers()
        
        if (!listError && users) {
          const userToConfirm = users.find(u => u.email?.toLowerCase() === email.toLowerCase())
          if (userToConfirm) {
            // Confirm the email
            const { error: confirmError } = await adminClient.auth.admin.updateUserById(
              userToConfirm.id,
              { email_confirm: true }
            )
            
            if (!confirmError) {
              console.log('Email auto-confirmed for:', email)
              // Retry login after confirmation
              const retryResult = await supabase.auth.signInWithPassword({
                email,
                password
              })
              
              if (!retryResult.error && retryResult.data) {
                authData = retryResult.data
                authError = null
              }
            }
          }
        }
      } catch (confirmErr) {
        console.warn('Could not auto-confirm email during login:', confirmErr)
        // Fall through to return the original error
      }
    }

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 401 }
      )
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      console.error('Error fetching user profile:', profileError)
      // Continue even if profile fetch fails
    }

    // Determine user_type if not set (for backward compatibility)
    const profile = userProfile as any
    let userType = profile?.user_type
    if (!userType) {
      if (authData.user.email === 'admin@sagecoin.com' || profile?.is_admin === true) {
        userType = 'admin'
      } else if (profile?.joined_vip === true || profile?.subscribed_to_courses === true) {
        userType = 'member'
      } else {
        userType = 'user'
      }
    }

    // Return user data with session
    return NextResponse.json({
      user: {
        id: authData.user.id,
        email: authData.user.email,
        user_type: userType,
        ...(profile || {})
      },
      session: authData.session
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


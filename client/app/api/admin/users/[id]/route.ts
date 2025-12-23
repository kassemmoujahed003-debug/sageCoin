import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// PATCH update user (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createServerClient()

    // Verify the user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const { data: userProfile, error: profileCheckError } = await (supabase as any)
      .from('users')
      .select('is_admin, user_type, email')
      .eq('id', user.id)
      .single()
    
    // Check if user is admin (check user_type first, then fallback to is_admin)
    const currentUserType = (userProfile as any)?.user_type
    const isAdminValue = (userProfile as any)?.is_admin
    const userEmail = (userProfile as any)?.email
    
    const isAdmin = 
      currentUserType === 'admin' || 
      isAdminValue === true || 
      isAdminValue === 'true' || 
      isAdminValue === 1 ||
      userEmail === 'admin@sagecoin.com'
    
    if (profileCheckError || !userProfile || !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { user_type, subscribed_to_courses, joined_vip, email } = body

    // Build update object
    const updates: any = {}
    
    // Update user_type (new system)
    if (body.user_type && ['admin', 'user', 'member'].includes(body.user_type)) {
      updates.user_type = body.user_type
      
      // When setting user_type, also update legacy fields for backward compatibility
      if (body.user_type === 'member') {
        updates.subscribed_to_courses = true
        updates.joined_vip = true
      } else if (body.user_type === 'user') {
        updates.subscribed_to_courses = false
        updates.joined_vip = false
      }
      // admin keeps existing subscribed_to_courses and joined_vip
    }
    
    // Legacy type mapping (for backward compatibility)
    if (body.type && !body.user_type) {
      if (body.type === 'vip' || body.type === 'member') {
        updates.user_type = 'member'
        updates.joined_vip = true
        updates.subscribed_to_courses = true
      } else if (body.type === 'subscriber') {
        updates.user_type = 'member'
        updates.subscribed_to_courses = true
        updates.joined_vip = false
      } else {
        updates.user_type = 'user'
        updates.subscribed_to_courses = false
        updates.joined_vip = false
      }
    }
    
    // Direct field updates
    if (typeof subscribed_to_courses === 'boolean') {
      updates.subscribed_to_courses = subscribed_to_courses
    }
    if (typeof joined_vip === 'boolean') {
      updates.joined_vip = joined_vip
    }
    if (email && typeof email === 'string') {
      // Note: Email update in auth.users would require Supabase admin API
      // For now, we only update the users table
      updates.email = email
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    // Update user in database
    const { data: updatedUser, error: updateError } = await (supabase as any)
      .from('users')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      )
    }

    // Determine user type
    let userType: 'admin' | 'user' | 'member' = 'user'
    if (updatedUser.user_type && ['admin', 'user', 'member'].includes(updatedUser.user_type)) {
      userType = updatedUser.user_type
    } else if (updatedUser.email === 'admin@sagecoin.com' || updatedUser.is_admin === true) {
      userType = 'admin'
    } else if (updatedUser.joined_vip === true || updatedUser.subscribed_to_courses === true) {
      userType = 'member'
    }
    
    // Transform to match frontend interface
    const transformedUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.email.split('@')[0],
      user_type: userType,
      type: userType === 'admin' ? 'admin' : (userType === 'member' ? 'member' : 'user'), // For backward compatibility
      joinedDate: updatedUser.created_at.split('T')[0],
      status: 'active' as 'active' | 'inactive',
    }

    return NextResponse.json({ user: transformedUser })

  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


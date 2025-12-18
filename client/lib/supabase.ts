import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client (use in components)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (use in API routes)
// Creates a client with the anon key for RLS-enabled operations
export function createServerClient(): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Create a Supabase client with a user's access token
// Use this when you need to perform operations as a specific user (for RLS)
export async function createClientWithToken(accessToken: string): Promise<SupabaseClient<Database>> {
  const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  
  // Set the session so RLS knows which user is making the request
  await client.auth.setSession({
    access_token: accessToken,
    refresh_token: '' // Not needed for server-side operations
  } as any)
  
  return client
}


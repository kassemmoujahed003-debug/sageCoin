-- Create Admin User Script
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/sql/new

-- Step 1: Add is_admin field to users table (if it doesn't exist)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Step 2: Create an admin user
-- This will create a user in auth.users and then add a profile in public.users
-- Note: You'll need to create the auth user first through Supabase Auth, then run the update below

-- Option A: If you want to manually create the user via Supabase Dashboard:
-- 1. Go to Authentication > Users > Add User
-- 2. Create a user with email: admin@sagecoin.com and password: Admin@123456
-- 3. Then run this update query (replace the email with the actual user's email):

-- UPDATE public.users 
-- SET is_admin = true 
-- WHERE email = 'admin@sagecoin.com';

-- Option B: Create admin user via SQL (requires service role key or direct database access)
-- This inserts directly into auth.users (not recommended for production, but works for setup)

-- First, let's create the auth user using Supabase's auth schema
DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Create user in auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@sagecoin.com',
    crypt('Admin@123456', gen_salt('bf')), -- Password: Admin@123456
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO new_user_id;

  -- Create profile in public.users
  INSERT INTO public.users (
    id,
    email,
    language,
    subscribed_to_courses,
    joined_vip,
    current_leverage,
    current_lot_size,
    is_admin
  ) VALUES (
    new_user_id,
    'admin@sagecoin.com',
    'en',
    true,
    true,
    100,
    0.1,
    true
  );
END $$;

-- If the above doesn't work, use this simpler approach:
-- Just mark an existing user as admin (after creating them through the signup process)

-- To make an existing user an admin, run:
-- UPDATE public.users SET is_admin = true WHERE email = 'your-email@example.com';


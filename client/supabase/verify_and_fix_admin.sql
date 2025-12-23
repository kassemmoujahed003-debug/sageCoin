-- Verify and Fix Admin User
-- Run these queries to check if your admin user exists and fix any issues

-- 1. Check if user exists in public.users table
SELECT id, email, is_admin, created_at 
FROM public.users 
WHERE email = 'admin@sagecoin.com';

-- 2. Check if user exists in auth.users table
SELECT id, email, email_confirmed_at, created_at
FROM auth.users 
WHERE email = 'admin@sagecoin.com';

-- If the user doesn't exist in auth.users, you need to:
-- Option A: Sign up through the app at /login
-- Option B: Create user in Supabase Dashboard > Authentication > Users

-- 3. If user exists but password is wrong, reset password:
-- Go to Supabase Dashboard > Authentication > Users > Find your user > Click "Reset Password"
-- Or run this (you'll need to set a new password hash):
-- UPDATE auth.users 
-- SET encrypted_password = crypt('Admin@123456', gen_salt('bf'))
-- WHERE email = 'admin@sagecoin.com';

-- 4. Verify the user can be authenticated
-- After resetting password, try logging in again


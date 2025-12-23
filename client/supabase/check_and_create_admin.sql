-- Step 1: Check if is_admin column exists
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'public'
  AND column_name = 'is_admin';

-- Step 2: Add is_admin column if it doesn't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Step 3: Check all existing users
SELECT id, email, is_admin, subscribed_to_courses, joined_vip 
FROM public.users 
ORDER BY created_at DESC;

-- Step 4: Check if admin@sagecoin.com exists in auth.users
SELECT id, email, email_confirmed_at, created_at
FROM auth.users 
WHERE email = 'admin@sagecoin.com';

-- If admin@sagecoin.com doesn't exist, you need to:
-- 1. Go to your app /login page
-- 2. Click "Sign Up"
-- 3. Create account with email: admin@sagecoin.com and password: Admin@123456
-- 4. Then come back and run Step 5

-- Step 5: After creating the user, make them admin
UPDATE public.users 
SET is_admin = true 
WHERE email = 'admin@sagecoin.com';


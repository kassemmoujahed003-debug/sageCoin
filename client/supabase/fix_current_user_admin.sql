-- Fix Admin Access for Current User
-- This will make your currently logged-in user an admin

-- Step 1: Check your current user's email
-- First, find out which user you're logged in as
-- Look at your browser's localStorage: localStorage.getItem('user')
-- Or check the Supabase dashboard Auth > Users

-- Step 2: Make the user an admin
-- Replace 'your-email@example.com' with your actual email
UPDATE public.users 
SET is_admin = true 
WHERE email = 'kassemmoujahed003@gmail.com';

-- Step 3: Verify it worked
SELECT id, email, is_admin, subscribed_to_courses, joined_vip 
FROM public.users 
WHERE email = 'kassemmoujahed003@gmail.com';

-- You should see is_admin = true

-- If you want to make admin@sagecoin.com admin instead, use:
-- UPDATE public.users SET is_admin = true WHERE email = 'admin@sagecoin.com';


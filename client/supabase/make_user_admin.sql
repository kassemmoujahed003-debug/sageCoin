-- Make an existing user an admin
-- This is the SIMPLEST way - just update the existing user

-- Step 1: First, add the is_admin column (if you haven't already)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Step 2: Update the user to be an admin (replace email with your actual email)
UPDATE public.users 
SET is_admin = true 
WHERE email = 'admin@sagecoin.com';

-- Step 3: Verify it worked
SELECT id, email, is_admin, subscribed_to_courses, joined_vip 
FROM public.users 
WHERE email = 'admin@sagecoin.com';

-- You should see is_admin = true


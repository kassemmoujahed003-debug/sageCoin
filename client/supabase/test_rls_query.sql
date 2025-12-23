-- Test if RLS is working correctly
-- Run this to check if the function and policy work

-- First, check if the function exists and works
SELECT public.is_current_user_admin();

-- Check what policies exist
SELECT 
    policyname, 
    cmd, 
    qual::text as condition,
    with_check::text as with_check
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public'
ORDER BY policyname;

-- Check if you can query users as an authenticated user
-- This should work if RLS is set up correctly
-- (Note: This will only work when run in the context of an authenticated user)
SELECT id, email, is_admin 
FROM public.users 
LIMIT 5;


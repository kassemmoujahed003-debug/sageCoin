-- Update RLS Policy to Allow Admins to View All Users
-- Run this in Supabase SQL Editor

-- Step 1: Create a helper function to check if user is admin (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Drop the old restrictive policy
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;

-- Step 3: Create a new policy that allows:
-- - Users to see their own profile
-- - Admins to see all profiles
CREATE POLICY "Users can view own profile or admins can view all"
  ON public.users FOR SELECT
  USING (
    auth.uid() = id OR public.is_admin(auth.uid())
  );

-- Step 4: Verify it worked
SELECT * FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';


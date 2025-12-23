-- Simple Fix for RLS - Allow Admins to View All Users
-- Run this SQL to fix the RLS policy issue

-- Step 1: Drop existing restrictive policy (if exists)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;

-- Step 2: Create a function that checks if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.users 
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Step 3: Create new policy that allows:
-- - Users to see their own profile
-- - Admins to see all profiles
CREATE POLICY "Users can view own profile or admins can view all"
  ON public.users FOR SELECT
  USING (
    -- Users can always see their own profile
    auth.uid() = id 
    OR 
    -- Admins can see all profiles
    public.is_current_user_admin()
  );

-- Step 4: Verify the new policy
SELECT policyname, cmd, qual::text
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';


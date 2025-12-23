-- Final Fix for RLS - Drop and Recreate Policy
-- Run this SQL to fix the RLS policy issue

-- Step 1: Drop ALL existing policies on users table (we'll recreate them)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own profile or admins can view all" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Public users are viewable by everyone." ON public.users;

-- Step 2: Create/Replace the function that checks if current user is admin
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

-- Step 3: Create the new policy that allows:
-- - Users to see their own profile
-- - Admins to see all profiles
CREATE POLICY "Users can view own profile or admins can view all"
  ON public.users FOR SELECT
  USING (
    auth.uid() = id 
    OR 
    public.is_current_user_admin()
  );

SELECT 
    policyname, 
    cmd, 
    qual::text as condition
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public'
ORDER BY policyname;


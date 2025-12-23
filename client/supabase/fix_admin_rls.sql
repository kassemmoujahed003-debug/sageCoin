-- Fix RLS for Admin Users
-- The issue is that RLS policies only allow users to see their own data
-- We need to add a policy that allows admins to see all users

-- Step 1: Create a function to check if a user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Add a policy that allows admins to view all users
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

CREATE POLICY "Admins can view all users"
  ON public.users FOR SELECT
  USING (
    -- Users can see their own profile OR admins can see all profiles
    auth.uid() = id OR public.is_admin(auth.uid())
  );

-- Step 3: Verify the policies
SELECT * FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';


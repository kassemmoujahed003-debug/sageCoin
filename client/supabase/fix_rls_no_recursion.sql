-- Fix RLS Without Infinite Recursion
-- The key is to use SECURITY DEFINER function that bypasses RLS

-- Step 1: Drop all existing policies and functions
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own profile or admins can view all" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Public users are viewable by everyone." ON public.users;
DROP FUNCTION IF EXISTS public.is_current_user_admin() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin(UUID) CASCADE;

-- Step 2: Create a SECURITY DEFINER function that bypasses RLS
-- This function runs with the privileges of the function owner (postgres)
-- So it can check is_admin without triggering RLS policies
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  result BOOLEAN;
BEGIN
  -- This query bypasses RLS because SECURITY DEFINER
  SELECT is_admin INTO result
  FROM public.users
  WHERE id = auth.uid();
  
  RETURN COALESCE(result, false);
END;
$$;

-- Step 3: Create the policy using the function
-- This won't cause recursion because the function bypasses RLS
CREATE POLICY "Users can view own profile or admins can view all"
  ON public.users FOR SELECT
  USING (
    auth.uid() = id 
    OR 
    public.is_current_user_admin()
  );

-- Step 4: Verify
SELECT 
    policyname, 
    cmd
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';


-- Fix the function to ensure it works correctly
-- The policy condition might need the public schema prefix

-- Step 1: Verify the function exists and recreate if needed
DROP FUNCTION IF EXISTS public.is_current_user_admin() CASCADE;

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

-- Step 2: Update the policy to explicitly use public schema
DROP POLICY IF EXISTS "Users can view own profile or admins can view all" ON public.users;

CREATE POLICY "Users can view own profile or admins can view all"
  ON public.users FOR SELECT
  USING (
    auth.uid() = id 
    OR 
    public.is_current_user_admin()
  );

-- Step 3: Verify it worked
SELECT 
    policyname, 
    cmd,
    qual::text as condition
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';


-- Working Fix for RLS - Simpler Approach
-- The issue is that SECURITY DEFINER functions might not preserve auth context correctly

-- Step 1: Drop all existing policies and functions
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own profile or admins can view all" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Public users are viewable by everyone." ON public.users;
DROP FUNCTION IF EXISTS public.is_current_user_admin() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin(UUID) CASCADE;

-- Step 2: Create a simpler policy that uses a direct subquery
-- This avoids the SECURITY DEFINER function issue
CREATE POLICY "Users can view own profile or admins can view all"
  ON public.users FOR SELECT
  USING (
    -- Users can see their own profile
    auth.uid() = id 
    OR 
    -- Admins can see all profiles (check directly in the policy)
    EXISTS (
      SELECT 1 
      FROM public.users u
      WHERE u.id = auth.uid() AND u.is_admin = true
    )
  );

-- Step 3: Verify the policy
SELECT 
    policyname, 
    cmd,
    CASE 
      WHEN qual IS NOT NULL THEN qual::text
      ELSE 'No condition'
    END as condition
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public'
ORDER BY policyname;


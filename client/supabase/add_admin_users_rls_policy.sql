-- Add RLS Policies to allow admins to view and update all users
-- This extends the existing policies that only allow users to access their own profile

-- IMPORTANT: If you already ran the previous version of this script and got infinite recursion errors,
-- you may need to drop the existing policies first:
-- DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
-- DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

-- First, create a SECURITY DEFINER function to check if a user is an admin
-- This function bypasses RLS to avoid infinite recursion
CREATE OR REPLACE FUNCTION public.is_user_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_is_admin BOOLEAN := false;
  user_type_val TEXT;
  user_email_val TEXT;
BEGIN
  SELECT 
    is_admin,
    user_type,
    email
  INTO 
    user_is_admin,
    user_type_val,
    user_email_val
  FROM public.users
  WHERE id = user_id;
  
  -- Check if user is admin by any of the criteria
  RETURN COALESCE(user_is_admin, false) = true 
    OR COALESCE(user_type_val, '') = 'admin' 
    OR COALESCE(user_email_val, '') = 'admin@sagecoin.com';
END;
$$;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

-- Policy: Admins can view all users
-- Uses the SECURITY DEFINER function to avoid infinite recursion
CREATE POLICY "Admins can view all users"
  ON public.users
  FOR SELECT
  USING (
    public.is_user_admin(auth.uid())
  );

-- Policy: Admins can update all users
-- Uses the SECURITY DEFINER function to avoid infinite recursion
CREATE POLICY "Admins can update all users"
  ON public.users
  FOR UPDATE
  USING (
    public.is_user_admin(auth.uid())
  );


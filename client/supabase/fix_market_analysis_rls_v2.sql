-- Fix RLS policies for market_analysis_sections table (Version 2)
-- Run this in Supabase SQL Editor after creating the table

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Authenticated users can manage market analysis sections" ON public.market_analysis_sections;
DROP POLICY IF EXISTS "Admins can manage market analysis sections" ON public.market_analysis_sections;

-- Step 2: Drop existing function if it exists
DROP FUNCTION IF EXISTS public.is_current_user_admin_market_analysis() CASCADE;

-- Step 3: Create a more robust function to check if current user is admin
-- This function handles NULL cases and uses SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.is_current_user_admin_market_analysis()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  user_type_val TEXT;
  is_admin_val BOOLEAN;
  user_email TEXT;
BEGIN
  -- Get user info (bypasses RLS because SECURITY DEFINER)
  SELECT u.user_type, COALESCE(u.is_admin, false), u.email 
  INTO user_type_val, is_admin_val, user_email
  FROM public.users u
  WHERE u.id = auth.uid();
  
  -- If user not found, return false
  IF user_type_val IS NULL AND user_email IS NULL THEN
    RETURN false;
  END IF;
  
  -- Return true if user is admin (check user_type, is_admin, or email)
  RETURN (
    COALESCE(user_type_val, '') = 'admin' 
    OR is_admin_val = true 
    OR COALESCE(user_email, '') = 'admin@sagecoin.com'
  );
END;
$$;

-- Step 4: Create policy for admins to manage (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can manage market analysis sections"
  ON public.market_analysis_sections 
  FOR ALL
  USING (public.is_current_user_admin_market_analysis())
  WITH CHECK (public.is_current_user_admin_market_analysis());

-- Step 5: Ensure public read policy exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'market_analysis_sections' 
    AND policyname = 'Market analysis sections are publicly readable'
  ) THEN
    CREATE POLICY "Market analysis sections are publicly readable"
      ON public.market_analysis_sections FOR SELECT
      USING (is_active = true);
  END IF;
END $$;

-- Step 6: Verify the policies were created
SELECT 
    policyname, 
    cmd,
    qual::text as using_expression,
    with_check::text as with_check_expression
FROM pg_policies 
WHERE tablename = 'market_analysis_sections' 
AND schemaname = 'public'
ORDER BY policyname;

-- Step 7: Test the function (optional - remove this after testing)
-- SELECT public.is_current_user_admin_market_analysis() as is_admin;


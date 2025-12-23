-- Fix RLS policies for market_analysis_sections table
-- Run this in Supabase SQL Editor after creating the table

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can manage market analysis sections" ON public.market_analysis_sections;
DROP POLICY IF EXISTS "Admins can manage market analysis sections" ON public.market_analysis_sections;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.is_current_user_admin_market_analysis() CASCADE;

-- Create a function to check if current user is admin
-- This function uses SECURITY DEFINER to bypass RLS when checking the users table
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
  -- This query bypasses RLS because SECURITY DEFINER
  SELECT u.user_type, u.is_admin, u.email 
  INTO user_type_val, is_admin_val, user_email
  FROM public.users u
  WHERE u.id = auth.uid();
  
  -- Return true if user is admin (check user_type, is_admin, or email)
  RETURN (
    user_type_val = 'admin' 
    OR is_admin_val = true 
    OR user_email = 'admin@sagecoin.com'
  );
END;
$$;

-- Allow admins to do everything (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can manage market analysis sections"
  ON public.market_analysis_sections FOR ALL
  USING (public.is_current_user_admin_market_analysis())
  WITH CHECK (public.is_current_user_admin_market_analysis());

-- Allow public to read active sections (keep existing)
-- This policy should already exist, but we'll ensure it's there
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


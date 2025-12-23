-- Disable RLS for market_analysis_sections table
-- Since only admins can access this through the API, we don't need RLS
-- Run this in Supabase SQL Editor

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Authenticated users can manage market analysis sections" ON public.market_analysis_sections;
DROP POLICY IF EXISTS "Admins can manage market analysis sections" ON public.market_analysis_sections;
DROP POLICY IF EXISTS "Market analysis sections are publicly readable" ON public.market_analysis_sections;

-- Step 2: Drop function (we don't need it)
DROP FUNCTION IF EXISTS public.is_current_user_admin_market_analysis() CASCADE;

-- Step 3: Disable RLS on the table
ALTER TABLE public.market_analysis_sections DISABLE ROW LEVEL SECURITY;

-- Step 4: Verify RLS is disabled
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'market_analysis_sections';

-- You should see rls_enabled = false


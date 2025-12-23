-- Verify RLS is completely disabled and no policies exist
-- Run this in Supabase SQL Editor

-- Check if RLS is disabled
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'market_analysis_sections';

-- Check if any policies still exist (should return 0 rows)
SELECT 
    policyname, 
    cmd,
    qual::text as using_expression
FROM pg_policies 
WHERE tablename = 'market_analysis_sections' 
AND schemaname = 'public';

-- If policies exist, drop them all
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'market_analysis_sections' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.market_analysis_sections';
    END LOOP;
END $$;

-- Ensure RLS is disabled
ALTER TABLE public.market_analysis_sections DISABLE ROW LEVEL SECURITY;

-- Final verification
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'market_analysis_sections' AND schemaname = 'public') as policy_count
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'market_analysis_sections';


-- Ensure RLS is completely disabled for market_analysis_sections
-- Run this in Supabase SQL Editor

-- Step 1: Drop ALL policies (including any SELECT policies)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'market_analysis_sections' 
        AND schemaname = 'public'
    )
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.market_analysis_sections';
        RAISE NOTICE 'Dropped policy: %', r.policyname;
    END LOOP;
END $$;

-- Step 2: Ensure RLS is disabled
ALTER TABLE public.market_analysis_sections DISABLE ROW LEVEL SECURITY;

-- Step 3: Verify - should show rls_enabled = false and policy_count = 0
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'market_analysis_sections' AND schemaname = 'public') as policy_count
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'market_analysis_sections';

-- Step 4: Test query (should return all active sections)
SELECT COUNT(*) as active_sections_count
FROM public.market_analysis_sections
WHERE is_active = true;


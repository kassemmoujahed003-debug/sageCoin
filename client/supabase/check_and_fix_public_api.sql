-- Check and fix issues preventing public API from returning all sections
-- Run this in Supabase SQL Editor

-- Step 1: Check current RLS status
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'market_analysis_sections' AND schemaname = 'public') as policy_count
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'market_analysis_sections';

-- Step 2: List all policies (should be 0)
SELECT 
    policyname, 
    cmd,
    qual::text as using_expression
FROM pg_policies 
WHERE tablename = 'market_analysis_sections' 
AND schemaname = 'public';

-- Step 3: Drop ALL policies if any exist
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

-- Step 4: Ensure RLS is disabled
ALTER TABLE public.market_analysis_sections DISABLE ROW LEVEL SECURITY;

-- Step 5: Test query as anonymous user (simulating public API)
-- This should return all 3 active sections
SET ROLE anon;
SELECT COUNT(*) as active_count, array_agg(id) as section_ids
FROM public.market_analysis_sections
WHERE is_active = true;
RESET ROLE;

-- Step 6: Verify all 3 sections exist and are active
SELECT 
    id,
    title_en,
    display_order,
    is_active,
    created_at
FROM public.market_analysis_sections
WHERE is_active = true
ORDER BY display_order;


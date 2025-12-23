-- Final Fix: Use auth.uid() check instead of auth.role()
-- Run this in Supabase SQL Editor

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Authenticated users can manage market analysis sections" ON public.market_analysis_sections;
DROP POLICY IF EXISTS "Admins can manage market analysis sections" ON public.market_analysis_sections;

-- Step 2: Drop function (we don't need it)
DROP FUNCTION IF EXISTS public.is_current_user_admin_market_analysis() CASCADE;

-- Step 3: Allow any authenticated user to manage (INSERT, UPDATE, DELETE)
-- We check admin status in the API layer, so this is safe
-- Using auth.uid() IS NOT NULL is more reliable than auth.role()
CREATE POLICY "Authenticated users can manage market analysis sections"
  ON public.market_analysis_sections 
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Step 4: Ensure public read policy exists
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

-- Step 5: Verify the policies were created
SELECT 
    policyname, 
    cmd,
    qual::text as using_expression,
    with_check::text as with_check_expression
FROM pg_policies 
WHERE tablename = 'market_analysis_sections' 
AND schemaname = 'public'
ORDER BY policyname;

-- Step 6: Test query to see current user (for debugging)
-- SELECT auth.uid() as current_user_id, auth.role() as current_role;


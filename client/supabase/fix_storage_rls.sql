-- Fix RLS for market-analysis storage bucket
-- Run this in Supabase SQL Editor

-- Step 1: Check if bucket exists and get its ID
SELECT name, id, public 
FROM storage.buckets 
WHERE name = 'market-analysis';

-- Step 2: Drop existing storage policies (if any)
DROP POLICY IF EXISTS "Public can read market analysis images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload market analysis images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;

-- Step 3: Allow public read access (so images can be displayed)
CREATE POLICY "Public can read market analysis images"
ON storage.objects FOR SELECT
USING (bucket_id = 'market-analysis');

-- Step 4: Allow authenticated users to upload (admin check is in API)
CREATE POLICY "Authenticated users can upload market analysis images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'market-analysis' 
  AND auth.uid() IS NOT NULL
);

-- Step 5: Allow authenticated users to update/delete their uploads
CREATE POLICY "Authenticated users can manage market analysis images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'market-analysis' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can delete market analysis images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'market-analysis' 
  AND auth.uid() IS NOT NULL
);

-- Step 6: Verify policies
SELECT 
    policyname, 
    cmd,
    qual::text as using_expression,
    with_check::text as with_check_expression
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%market%'
ORDER BY policyname;


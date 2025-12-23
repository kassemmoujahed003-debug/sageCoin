-- Test if the admin function exists and works
-- Run this to verify the function

-- Check if function exists
SELECT 
    p.proname as function_name,
    pg_get_function_result(p.oid) as return_type,
    pg_get_function_arguments(p.oid) as arguments
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
  AND p.proname = 'is_current_user_admin';

-- If you want to test the function (will only work if you're authenticated):
-- SELECT public.is_current_user_admin();


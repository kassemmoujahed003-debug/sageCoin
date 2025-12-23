-- Add RLS Policy to allow users to check their own admin status
-- This should already be covered by the existing "Users can view own profile" policy
-- But let's verify and add if needed

-- First, check existing policies
SELECT * FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- The existing policy "Users can view own profile" should allow users to SELECT their own row
-- So checking is_admin should work if you query with auth.uid() = id

-- If you still have issues, you can add a more permissive policy for admin checks:
-- But be careful - this is only for reading the is_admin field

-- Actually, the issue might be that the API is using createServerClient() which doesn't set auth context
-- The API should use createClientWithToken() instead to properly set the user session for RLS


-- Confirm admin@sagecoin.com email immediately
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/sql/new

-- Update the email_confirmed_at field in auth.users
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@sagecoin.com' 
  AND email_confirmed_at IS NULL;

-- Verify the email is confirmed
SELECT id, email, email_confirmed_at, created_at
FROM auth.users 
WHERE email = 'admin@sagecoin.com';


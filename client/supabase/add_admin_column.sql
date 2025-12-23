-- Add is_admin column to users table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/sql/new

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'is_admin';


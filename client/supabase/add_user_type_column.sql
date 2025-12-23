-- Add user_type column to users table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/sql/new

-- Add user_type column (admin, user, member)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS user_type TEXT NOT NULL DEFAULT 'user' 
CHECK (user_type IN ('admin', 'user', 'member'));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);

-- Set admin@sagecoin.com as admin
UPDATE public.users 
SET user_type = 'admin' 
WHERE email = 'admin@sagecoin.com';

-- Migrate existing data: if joined_vip or subscribed_to_courses, set to member
UPDATE public.users 
SET user_type = 'member' 
WHERE (joined_vip = true OR subscribed_to_courses = true) 
  AND user_type = 'user'
  AND email != 'admin@sagecoin.com';

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'user_type';


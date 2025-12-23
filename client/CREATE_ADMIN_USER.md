# How to Create an Admin User

## ✅ Easiest Method (Recommended)

### Step 1: Sign Up via Your App
1. Go to `/login` on your site
2. Click "Sign Up"
3. Create an account with:
   - **Email:** `admin@sagecoin.com`
   - **Password:** `Admin@123456` (or your preferred password)

### Step 2: Add Admin Column (One-Time Setup)

1. Go to Supabase Dashboard → SQL Editor
   - Link: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/sql/new

2. Run this SQL to add the admin column:
   ```sql
   ALTER TABLE public.users 
   ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;
   ```
   Click "Run"

### Step 3: Mark User as Admin

In the same SQL Editor, run this (it will UPDATE the existing user):
   ```sql
   UPDATE public.users 
   SET is_admin = true 
   WHERE email = 'admin@sagecoin.com';
   ```
   Click "Run"

**Note:** If you get an error that the user doesn't exist, wait a few seconds after signup for the database trigger to create the profile, then try again.

### Step 3: Test
1. Log in with your admin credentials
2. Go to `/dashboard`
3. You should now see the users list with admin privileges

---

## Alternative: Create Admin via Supabase Dashboard

### Step 1: Create User in Supabase Auth
1. Go to: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/auth/users
2. Click "Add User" or "Invite User"
3. Enter:
   - **Email:** `admin@sagecoin.com`
   - **Password:** `Admin@123456`
   - Check "Auto Confirm User"
4. Click "Create User"

### Step 2: Add Admin Column (if not exists)
Run in SQL Editor:
```sql
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;
```

### Step 3: Mark as Admin
Run in SQL Editor:
```sql
UPDATE public.users 
SET is_admin = true 
WHERE email = 'admin@sagecoin.com';
```

---

## Admin Credentials (Quick Method)

After following the steps above, you can use:

- **Email:** `admin@sagecoin.com`
- **Password:** `Admin@123456` (or whatever you set during signup)

**⚠️ IMPORTANT:** Change this password after first login in production!

---

## Verify Admin Status

To check if a user is admin:
```sql
SELECT id, email, is_admin 
FROM public.users 
WHERE email = 'admin@sagecoin.com';
```

This should return `is_admin = true`


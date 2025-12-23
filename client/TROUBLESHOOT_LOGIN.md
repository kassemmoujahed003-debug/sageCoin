# Troubleshooting Login Issues

## Error: "Invalid login credentials"

This error means the email/password combination doesn't match what's in the database.

### Step 1: Verify User Exists

Run this in Supabase SQL Editor:

```sql
-- Check if user exists in public.users
SELECT id, email, is_admin, created_at 
FROM public.users 
WHERE email = 'admin@sagecoin.com';

-- Check if user exists in auth.users (the authentication table)
SELECT id, email, email_confirmed_at, created_at
FROM auth.users 
WHERE email = 'admin@sagecoin.com';
```

### Step 2: Check Your Password

The password you're trying to use might not match what's stored. Try these options:

#### Option A: Reset Password via Supabase Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/auth/users
2. Find the user with email `admin@sagecoin.com`
3. Click on the user
4. Click "Reset Password" or "Send Password Reset Email"
5. Check your email for the password reset link
6. Set a new password

#### Option B: Create a New User (If user doesn't exist)

1. Go to your app: `/login`
2. Click "Sign Up"
3. Create account with:
   - Email: `admin@sagecoin.com`
   - Password: `Admin@123456` (or whatever you prefer)
4. Then run the UPDATE query to make them admin:
   ```sql
   UPDATE public.users 
   SET is_admin = true 
   WHERE email = 'admin@sagecoin.com';
   ```

#### Option C: Reset Password via Supabase Dashboard (Direct)

1. Go to: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/auth/users
2. Click on your user
3. In the user details, you can manually update the password
4. Click "Save"

### Step 3: Try Different Credentials

If you signed up through the app, you used the password you entered during signup. Try:
- The password you actually used during signup
- Or reset it using Option A above

### Step 4: Verify Admin Status

After logging in successfully, verify admin status:

```sql
SELECT email, is_admin 
FROM public.users 
WHERE email = 'admin@sagecoin.com';
```

Should return `is_admin = true`

---

## Common Issues

1. **User exists in public.users but not in auth.users**
   - Solution: Create user via signup or Supabase Dashboard

2. **Password doesn't match**
   - Solution: Reset password via Supabase Dashboard

3. **User not confirmed**
   - Solution: In Supabase Dashboard, click on user and confirm the email

4. **Wrong email**
   - Solution: Double-check the email you're using to log in


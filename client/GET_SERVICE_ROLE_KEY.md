# How to Get Your Supabase Service Role Key

## Quick Steps

1. **Go to Supabase Dashboard API Settings**
   - Direct link: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api
   - Or navigate: Dashboard → Your Project → Settings → API

2. **Find "Project API keys" Section**
   - Scroll down to see two keys:
     - **anon public** - This is what you're already using (safe for client-side)
     - **service_role** - This is what you need now (secret, server-only)

3. **Copy the service_role Key**
   - Click the **eye icon** 👁️ or **"Reveal"** button to show the key
   - Click the **copy button** 📋 to copy it
   - ⚠️ **IMPORTANT**: This key is SECRET - never expose it to the client!

4. **Add to Your .env File**
   
   Open your `client/.env` file and add this line:
   
   ```env
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.paste_your_service_role_key_here
   ```
   
   **Important:**
   - ✅ No spaces around the `=` sign
   - ✅ No quotes around the value
   - ✅ Paste the ENTIRE key (it's very long)
   - ✅ Make sure it's the **service_role** key, NOT the anon key

5. **Restart Your Dev Server**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

## Visual Guide

When you're on the API settings page, you'll see something like:

```
Project API keys
┌─────────────────────────────────────────────────┐
│ anon public                                     │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...        │
│ [👁️ Reveal] [📋 Copy]                           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ service_role  ⚠️ secret                         │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...        │
│ [👁️ Reveal] [📋 Copy]                           │
└─────────────────────────────────────────────────┘
```

**Copy the service_role key** (the second one, marked as "secret").

## What This Key Does

The service role key allows your server-side code to:
- ✅ Auto-confirm user emails (bypass email confirmation)
- ✅ Perform admin operations on users
- ✅ Bypass Row Level Security (RLS) policies

## Security Warning

⚠️ **NEVER:**
- ❌ Commit this key to git
- ❌ Use it in client-side code (browser)
- ❌ Share it publicly
- ❌ Put it in public repositories

✅ **ALWAYS:**
- ✅ Keep it in `.env` or `.env.local` (which should be gitignored)
- ✅ Only use it in server-side API routes
- ✅ Treat it like a password

## Verify It's Working

After adding the key and restarting:

1. Try signing up with a new email
2. Try logging in immediately (without checking email)
3. You should be able to log in successfully!

If you still get "Email not confirmed" errors:
- Check that the key is correct (service_role, not anon)
- Check that you restarted the dev server
- Check the console logs for any errors

## Direct Links

- **API Settings**: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api
- **Auth Settings**: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/auth/providers


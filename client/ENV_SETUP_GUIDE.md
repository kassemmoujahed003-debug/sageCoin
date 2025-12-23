# Environment Variables Setup Guide

The error "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" indicates that Supabase environment variables are missing.

## Quick Fix

1. **Create `.env.local` file** in the `client` directory (if it doesn't exist)

2. **Add your Supabase credentials**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://apocthoyjbbetumecndc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
DATABASE_URL=postgresql://postgres:moujahedkassem1999%40@db.apocthoyjbbetumecndc.supabase.co:5432/postgres
```

3. **Get your anon key**:
   - Go to: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api
   - Copy the `anon public` key
   - Paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

4. **Restart your Next.js dev server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart it
   npm run dev
   ```

## How to Check if It's Working

1. Check the browser console - you should see clear error messages if env vars are missing
2. Check the terminal where `npm run dev` is running - you should see warnings if env vars are missing
3. Try signing up again - it should work now!

## Still Having Issues?

1. Make sure `.env.local` is in the `client` directory (not the root)
2. Make sure the file is named exactly `.env.local` (not `.env` or `.env.local.txt`)
3. Make sure there are no extra spaces or quotes around the values
4. Restart your dev server after creating/editing `.env.local`


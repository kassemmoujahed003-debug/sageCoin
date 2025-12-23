# Fix "Invalid API key" Error

This error means your Supabase API key is incorrect or not properly formatted.

## How to Fix:

### 1. Get the Correct API Key

1. Go to your Supabase Dashboard:
   https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api

2. Find the "Project API keys" section

3. Copy the **anon public** key (NOT the service_role key!)
   - It should start with `eyJ...`
   - It's a long string (usually 100+ characters)
   - It's labeled as "anon" or "public"

### 2. Check Your .env.local File

Open `client/.env.local` and make sure it looks exactly like this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://apocthoyjbbetumecndc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwb2N0aG95amJiZXR1bWVjbmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMzQ1NjcsImV4cCI6MjAyNjgxMDU2N30.YOUR_ACTUAL_KEY_HERE
```

**Important:**
- ✅ No spaces around the `=` sign
- ✅ No quotes around the values
- ✅ Copy the ENTIRE key (it's very long)
- ✅ Make sure you're using the **anon** key, NOT service_role
- ✅ The URL should be exactly: `https://apocthoyjbbetumecndc.supabase.co`

### 3. Common Mistakes:

❌ **Wrong key**: Using service_role instead of anon  
❌ **Truncated key**: Not copying the entire key  
❌ **Extra spaces**: `NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...` (wrong)  
✅ **Correct**: `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...` (no spaces)  
❌ **Quotes**: `NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."` (wrong)  
✅ **Correct**: `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...` (no quotes)

### 4. Restart Your Dev Server

After fixing `.env.local`:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### 5. Verify It's Working

The error should go away and signup/login should work!

## Still Having Issues?

1. Double-check the key in Supabase dashboard - make sure it matches exactly
2. Check for hidden characters or extra spaces
3. Make sure the file is saved as `.env.local` (not `.env.local.txt`)
4. Check the terminal/console for any error messages


# How to Find Your Supabase Anon Key

## Direct Link
https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api

## Step-by-Step Instructions

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Log in if needed

2. **Select Your Project**
   - Click on project: **apocthoyjbbetumecndc**

3. **Navigate to Settings → API**
   - Click the **Settings** icon (⚙️) in the left sidebar
   - Click on **API** in the settings menu

4. **Find "Project API keys" Section**
   - Scroll down to the "Project API keys" section
   - You'll see two keys:
     - **anon public** ← Use this one!
     - **service_role** ← Don't use this (it's secret)

5. **Copy the anon public Key**
   - Click the **eye icon** 👁️ to reveal the key (or click "Reveal")
   - Or click the **copy button** 📋 to copy it directly
   - The key starts with `eyJ...` and is very long (100+ characters)

6. **What the Key Looks Like**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwb2N0aG95amJiZXR1bWVjbmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMzQ1NjcsImV4cCI6MjAyNjgxMDU2N30.very_long_string_here...
   ```

## After Copying the Key

1. Open `client/.env.local` file
2. Paste it like this:
   ```env
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_key_here_without_quotes
   ```
3. Save the file
4. Restart your dev server: `npm run dev`

## Tips

- ✅ Use **anon public** key (safe for client-side)
- ❌ Don't use **service_role** key (secret, server-only)
- ✅ Copy the ENTIRE key (it's very long)
- ✅ No quotes around the key value
- ✅ No spaces around the `=` sign

## Quick Navigation

**Direct link to API settings:**
https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api


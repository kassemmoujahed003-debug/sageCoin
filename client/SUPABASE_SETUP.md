# Supabase Setup Guide

This guide will help you set up Supabase for the SageCoin backend.

## Step 1: Get Your Supabase API Keys

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/apocthoyjbbetumecndc
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (already in .env.example)
   - **anon/public key** - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Create Environment File

Create a `.env.local` file in the `client` directory:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Then edit `.env.local` and add your Supabase anon key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://apocthoyjbbetumecndc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
DATABASE_URL=postgresql://postgres:moujahedkassem1999%40@db.apocthoyjbbetumecndc.supabase.co:5432/postgres
```

**Important**: The password in `DATABASE_URL` is URL-encoded (`@` becomes `%40`)

## Step 3: Run Database Schema

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Open the file `client/supabase/schema.sql`
4. Copy all the SQL code
5. Paste it into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)

This will create:
- `users` table (extends auth.users)
- `courses` table
- `trades` table
- Row Level Security (RLS) policies
- Triggers for auto-updating timestamps
- Function to create user profiles on signup

## Step 4: Verify Setup

After running the schema, verify the tables were created:

1. Go to **Table Editor** in Supabase Dashboard
2. You should see three tables: `users`, `courses`, and `trades`
3. Check that RLS is enabled on all tables (lock icon should be visible)

## Step 5: Test the API

Start your Next.js development server:

```bash
cd client
npm run dev
```

Test the registration endpoint:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456","language":"en"}'
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires Bearer token)
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PATCH /api/users/profile` - Update user profile (protected)
- `PATCH /api/users/language` - Update language preference (protected)

### Settings
- `GET /api/settings` - Get user settings (protected)
- `PATCH /api/settings/leverage` - Update leverage (protected)
- `PATCH /api/settings/lot-size` - Update lot size (protected)

### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/[id]` - Get course details (public)
- `GET /api/courses/my-courses` - Get user's accessible courses (protected)

### Trades (VIP Only)
- `GET /api/trades` - Get active trades (VIP only, protected)
- `GET /api/trades/[id]` - Get trade details (VIP only, protected)

## Authentication Flow

1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Backend returns a session with `access_token` and `refresh_token`
3. Frontend stores the `access_token` in localStorage/sessionStorage
4. Frontend includes token in requests: `Authorization: Bearer <access_token>`
5. Backend verifies token using `supabase.auth.getUser(token)`

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- VIP trades are protected at both API and database level
- Never expose your service role key to the client
- The anon key is safe to use in client-side code (RLS protects data)

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in the `client` directory
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart your Next.js dev server after adding environment variables

### "Unauthorized" errors
- Make sure you're sending the Bearer token in the Authorization header
- Check that the token hasn't expired
- Verify the user exists in Supabase Auth

### "User profile not found"
- The `handle_new_user()` trigger should create a profile automatically
- If not, you may need to manually create a profile or re-run the schema SQL

### Database connection issues
- Verify your `DATABASE_URL` is correct
- Check that your password is URL-encoded (`@` → `%40`)
- Make sure your Supabase project is active

## Next Steps

1. ✅ Set up environment variables
2. ✅ Run database schema
3. ⏭️ Update frontend components to use the new API endpoints
4. ⏭️ Add authentication state management
5. ⏭️ Test all API endpoints
6. ⏭️ Deploy to Vercel (free hosting for Next.js)


# ✅ Backend Setup Complete!

Your SageCoin backend is now set up using **Supabase + Next.js API Routes**. No separate backend server needs to be hosted!

## What's Been Created

### 📦 Installed Packages
- `@supabase/supabase-js` - Supabase client library

### 🗄️ Database Schema
- `supabase/schema.sql` - Complete database schema with:
  - `users` table (extends Supabase auth)
  - `courses` table
  - `trades` table
  - Row Level Security (RLS) policies
  - Triggers for auto-updates
  - Function to create user profiles on signup

### 🔧 Core Files
- `lib/supabase.ts` - Supabase client utilities
- `types/database.ts` - TypeScript types for database models
- `.env.example` - Environment variable template

### 🛣️ API Routes Created

**Authentication:**
- ✅ `POST /api/auth/register` - Register new user
- ✅ `POST /api/auth/login` - Login
- ✅ `GET /api/auth/me` - Get current user (protected)
- ✅ `POST /api/auth/logout` - Logout

**Users:**
- ✅ `GET /api/users/profile` - Get profile (protected)
- ✅ `PATCH /api/users/profile` - Update profile (protected)
- ✅ `PATCH /api/users/language` - Update language (protected)

**Settings:**
- ✅ `GET /api/settings` - Get settings (protected)
- ✅ `PATCH /api/settings/leverage` - Update leverage (protected)
- ✅ `PATCH /api/settings/lot-size` - Update lot size (protected)

**Courses:**
- ✅ `GET /api/courses` - List all courses (public)
- ✅ `GET /api/courses/[id]` - Course details (public)
- ✅ `GET /api/courses/my-courses` - User's courses (protected)

**Trades (VIP):**
- ✅ `GET /api/trades` - Active trades (VIP only)
- ✅ `GET /api/trades/[id]` - Trade details (VIP only)

## Next Steps

### 1. Get Your Supabase API Key

1. Go to: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api
2. Copy the **anon/public** key

### 2. Create `.env.local` File

In the `client` directory, create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://apocthoyjbbetumecndc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-key-here
DATABASE_URL=postgresql://postgres:moujahedkassem1999%40@db.apocthoyjbbetumecndc.supabase.co:5432/postgres
```

**Important:** The password in DATABASE_URL is already URL-encoded (`@` → `%40`)

### 3. Run Database Schema

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Open `client/supabase/schema.sql`
4. Copy all SQL code
5. Paste into SQL Editor
6. Click **Run**

This creates all tables, RLS policies, and triggers.

### 4. Test the API

Start your dev server:
```bash
cd client
npm run dev
```

Test registration:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456","language":"en"}'
```

## Documentation

- 📖 `SUPABASE_SETUP.md` - Detailed setup instructions
- 📖 `README_BACKEND.md` - Backend architecture overview

## Security Features

✅ Row Level Security (RLS) on all tables  
✅ JWT token authentication  
✅ Users can only access their own data  
✅ VIP endpoints check `joined_vip` flag  
✅ Course access controlled by `subscribed_to_courses` flag

## Deployment

When ready to deploy:
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**No database or backend hosting needed!** Everything runs on:
- Vercel (Next.js hosting - free)
- Supabase (database + auth - free tier)

## Need Help?

Check the setup guide: `SUPABASE_SETUP.md`


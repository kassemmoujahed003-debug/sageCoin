# SageCoin Backend - Supabase + Next.js API Routes

This backend uses **Supabase** for the database and authentication, with **Next.js API Routes** for the API layer. No separate backend server needs to be hosted!

## Architecture

```
Next.js Frontend + API Routes (Vercel - Free Hosting)
  ↓
Supabase (PostgreSQL Database + Auth - Free Tier)
```

## Quick Start

1. **Get your Supabase API keys**
   - Go to: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/settings/api
   - Copy your `anon/public` key

2. **Create `.env.local` file**
   ```bash
   cp .env.example .env.local
   ```
   Then add your Supabase anon key to `.env.local`

3. **Run the database schema**
   - Go to Supabase Dashboard → SQL Editor
   - Copy contents of `supabase/schema.sql`
   - Paste and run in SQL Editor

4. **Start the dev server**
   ```bash
   npm run dev
   ```

See `SUPABASE_SETUP.md` for detailed instructions.

## API Structure

All API routes are in `app/api/`:

```
app/api/
├── auth/
│   ├── register/route.ts      # POST - Register new user
│   ├── login/route.ts          # POST - Login
│   ├── me/route.ts             # GET - Get current user (protected)
│   └── logout/route.ts         # POST - Logout
├── users/
│   ├── profile/route.ts        # GET, PATCH - User profile (protected)
│   └── language/route.ts       # PATCH - Update language (protected)
├── settings/
│   ├── route.ts                # GET - Get settings (protected)
│   ├── leverage/route.ts       # PATCH - Update leverage (protected)
│   └── lot-size/route.ts       # PATCH - Update lot size (protected)
├── courses/
│   ├── route.ts                # GET - List all courses (public)
│   ├── [id]/route.ts           # GET - Course details (public)
│   └── my-courses/route.ts     # GET - User's courses (protected)
└── trades/
    ├── route.ts                # GET - Active trades (VIP only)
    └── [id]/route.ts           # GET - Trade details (VIP only)
```

## Authentication Flow

1. **Register/Login**: User calls `/api/auth/register` or `/api/auth/login`
2. **Receive Token**: Backend returns session with `access_token`
3. **Store Token**: Frontend stores token (localStorage/sessionStorage)
4. **Protected Requests**: Frontend sends `Authorization: Bearer <token>` header
5. **Verify Token**: API routes verify token using `supabase.auth.getUser(token)`
6. **RLS Protection**: Database Row Level Security ensures users only see their data

## Database Schema

- **users** - User profiles (extends Supabase auth.users)
- **courses** - Training courses
- **trades** - VIP trading data

All tables have Row Level Security (RLS) enabled.

## Key Files

- `lib/supabase.ts` - Supabase client utilities
- `types/database.ts` - TypeScript types for database
- `supabase/schema.sql` - Database schema and RLS policies

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://apocthoyjbbetumecndc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
DATABASE_URL=postgresql://postgres:moujahedkassem1999%40@db.apocthoyjbbetumecndc.supabase.co:5432/postgres
```

## Security

- ✅ Row Level Security (RLS) on all tables
- ✅ JWT token authentication
- ✅ Users can only access their own data
- ✅ VIP-only endpoints check `joined_vip` flag
- ✅ Course access controlled by `subscribed_to_courses` flag

## Deployment

Deploy to Vercel (free):
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

No database or backend server hosting needed! 🎉


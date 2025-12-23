# User Type System Implementation

This document describes the user type system that has been implemented in the SageCoin application.

## User Types

The system supports three user types:

1. **Admin** (`admin`)
   - Full access to dashboard
   - Can manage all users
   - Can change user types
   - Email: `admin@sagecoin.com` is automatically admin

2. **User** (`user`)
   - Basic logged-in user
   - Cannot access dashboard
   - Cannot see member/VIP content
   - Default type for new registrations

3. **Member** (`member`)
   - Can access member and VIP content
   - Can see VIP trading signals
   - Can access courses
   - Can be manually assigned by admin

## Database Schema

### Migration Required

Run the SQL migration to add the `user_type` column:

```sql
-- File: supabase/add_user_type_column.sql
```

This will:
- Add `user_type` column to `users` table
- Set default to `'user'`
- Set `admin@sagecoin.com` as admin
- Migrate existing VIP/subscriber users to `member`

## API Changes

### Authentication APIs

- **POST /api/auth/login**: Returns `user_type` in user object
- **POST /api/auth/register**: Sets new users to `user_type: 'user'` by default

### Admin APIs

- **GET /api/admin/users**: Returns users with `user_type` field
- **PATCH /api/admin/users/[id]**: Accepts `user_type` field to change user type

## Access Control

### Dashboard Access
- Only admins can access `/dashboard`
- Non-admin users are redirected to home page

### Member/VIP Content
- Components check `isMember()` to show/hide content
- `VipTradingSection` only shows full content to members
- `CoursesSection` only shows content to members

### Navigation
- Dashboard link in navbar only shows for admins
- Uses `canAccessDashboard()` utility function

## Utility Functions

Located in `lib/auth-utils.ts`:

- `isAdmin(user)`: Check if user is admin
- `isMember(user)`: Check if user can access member content
- `canAccessDashboard(user)`: Check if user can access dashboard
- `getUserType(user)`: Get user type from user object

## Frontend Components

### Updated Components

1. **hooks/useAuth.ts**
   - Added `userType`, `isAdmin`, `isMember` to return values

2. **app/dashboard/page.tsx**
   - Checks admin access before rendering
   - Redirects non-admins to home

3. **components/dashboard/UserList.tsx**
   - Updated to use new user types (admin, user, member)
   - Filters and stats updated

4. **components/dashboard/ChangeUserTypeDialog.tsx**
   - Updated to show admin/user/member options

5. **components/VipTradingSection.tsx**
   - Uses `isMember` prop instead of `joinedVip`
   - Shows content only to members

6. **components/Navbar.tsx**
   - Dashboard link only visible to admins
   - Uses auth utilities for role checks

7. **app/page.tsx**
   - Uses `useAuth` hook
   - Checks `isMember` for content visibility

## Backward Compatibility

The system maintains backward compatibility:

- Legacy `is_admin` field still works
- Legacy `joined_vip` and `subscribed_to_courses` fields still work
- `user_type` is derived from legacy fields if not set
- API accepts both `user_type` and legacy `type` field

## Setting Up Admin User

1. Run the database migration
2. The user `admin@sagecoin.com` is automatically set as admin
3. Or manually set any user's `user_type` to `'admin'` in the database

## Changing User Types

Admins can change user types through the dashboard:

1. Go to Dashboard → Users
2. Click on a user's actions menu
3. Select "Change Type"
4. Choose: Admin, User, or Member
5. Save

## Testing

1. **Test Admin Access**:
   - Login as `admin@sagecoin.com`
   - Should see dashboard link in navbar
   - Should be able to access `/dashboard`

2. **Test User Access**:
   - Register a new user
   - Should NOT see dashboard link
   - Should NOT see member/VIP content

3. **Test Member Access**:
   - Admin changes a user's type to "Member"
   - User should see VIP trading section content
   - User should see courses content


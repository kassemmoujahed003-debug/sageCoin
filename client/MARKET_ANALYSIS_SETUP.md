# Market Analysis Feature Setup Guide

This guide will help you set up the Market Analysis management feature in the Admin Dashboard.

## Prerequisites

1. Supabase project configured
2. Admin user account created
3. Database schema applied

## Setup Steps

### 1. Run Database Migration

1. Go to Supabase Dashboard → SQL Editor
2. Open the file `supabase/create_market_analysis_table.sql`
3. Copy and paste the SQL code into the SQL Editor
4. Click "Run" to execute the migration

This will create:
- `market_analysis_sections` table
- Row Level Security (RLS) policies
- Admin check function
- Indexes for performance
- Trigger for auto-updating timestamps

**Note:** If you already ran the migration and are getting RLS policy errors, run `supabase/fix_market_analysis_rls.sql` to fix the policies.

### 2. Create Supabase Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Configure the bucket:
   - **Name**: `market-analysis`
   - **Public bucket**: ✅ Check this (so images can be accessed publicly)
   - **File size limit**: 5MB (or your preferred limit)
   - **Allowed MIME types**: `image/jpeg, image/jpg, image/png, image/webp, image/gif`
4. Click "Create bucket"

### 3. Set Up Storage Policies (Optional but Recommended)

If you want to restrict uploads to admins only, you can set up storage policies:

1. Go to Supabase Dashboard → Storage → Policies
2. Select the `market-analysis` bucket
3. Create a policy for uploads (admin only):
   - Policy name: "Admins can upload"
   - Allowed operation: INSERT
   - Policy definition:
     ```sql
     (bucket_id = 'market-analysis' AND auth.role() = 'authenticated')
     ```
   - Note: The API route already checks for admin access, so this is optional

4. Create a policy for public read access:
   - Policy name: "Public can read"
   - Allowed operation: SELECT
   - Policy definition:
     ```sql
     (bucket_id = 'market-analysis')
     ```

### 4. Verify Setup

1. Log in as an admin user
2. Navigate to `/dashboard`
3. Click on the "Market Analysis" tab
4. You should see the Market Analysis management interface

## Usage

### Adding a Market Analysis Section

1. Go to Dashboard → Market Analysis tab
2. Click "Add Section"
3. Fill in the form:
   - Upload an image (or provide an image URL)
   - Enter title in English
   - Enter title in Arabic
   - Enter description in English
   - Enter description in Arabic
   - Set display order (lower numbers appear first)
   - Toggle "Active" to show/hide the section
4. Click "Save"

### Editing a Section

1. Find the section in the list
2. Click "Edit"
3. Modify the fields as needed
4. Click "Save"

### Deleting a Section

1. Find the section in the list
2. Click "Delete"
3. Confirm the deletion

### Displaying Sections on Frontend

The sections are automatically displayed on the frontend using the `MarketAnalysisSection` component. To add it to your page:

```tsx
import MarketAnalysisSection from '@/components/MarketAnalysisSection'

// In your page component:
<MarketAnalysisSection />
```

The component will:
- Fetch all active sections
- Display them with image on left/right (alternating)
- Show content in the current language (English/Arabic)
- Handle RTL layout for Arabic

## API Endpoints

### Public Endpoints

- `GET /api/market-analysis` - Get all active sections (public)

### Admin Endpoints (require authentication)

- `GET /api/admin/market-analysis` - Get all sections (including inactive)
- `POST /api/admin/market-analysis` - Create a new section
- `PATCH /api/admin/market-analysis/[id]` - Update a section
- `DELETE /api/admin/market-analysis/[id]` - Delete a section
- `POST /api/admin/market-analysis/upload` - Upload an image

## Database Schema

The `market_analysis_sections` table has the following structure:

- `id` (UUID) - Primary key
- `image_url` (TEXT) - URL or path to the image
- `title_en` (TEXT) - Title in English
- `title_ar` (TEXT) - Title in Arabic
- `description_en` (TEXT) - Description in English
- `description_ar` (TEXT) - Description in Arabic
- `display_order` (INTEGER) - Order for display (lower = first)
- `is_active` (BOOLEAN) - Whether the section is active
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

## Troubleshooting

### Images Not Uploading

1. Check that the `market-analysis` bucket exists in Supabase Storage
2. Verify the bucket is set to "Public"
3. Check browser console for error messages
4. Verify admin authentication token is valid

### Sections Not Displaying

1. Check that sections have `is_active = true`
2. Verify the API endpoint is accessible
3. Check browser console for errors
4. Ensure the `MarketAnalysisSection` component is included in your page

### Permission Errors

1. Verify you're logged in as an admin user
2. Check that RLS policies are correctly set up
3. Verify the authentication token is being sent in API requests

## Notes

- Images are stored in Supabase Storage bucket `market-analysis`
- Maximum image size is 5MB (configurable in the upload route)
- Supported image formats: JPEG, PNG, WebP, GIF
- Sections are ordered by `display_order` (ascending)
- Only active sections are displayed on the frontend
- The layout alternates image position (left/right) for visual variety


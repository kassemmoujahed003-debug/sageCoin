-- Create market_analysis_sections table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/apocthoyjbbetumecndc/sql/new

-- Market Analysis Sections table
CREATE TABLE IF NOT EXISTS public.market_analysis_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_market_analysis_display_order ON public.market_analysis_sections(display_order);
CREATE INDEX IF NOT EXISTS idx_market_analysis_is_active ON public.market_analysis_sections(is_active);

-- RLS is disabled for this table
-- Access is controlled through the API layer (admin-only)
-- No RLS policies needed

-- Trigger to automatically update updated_at
CREATE TRIGGER update_market_analysis_updated_at BEFORE UPDATE ON public.market_analysis_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


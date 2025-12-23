-- Create vip_dashboard_previews table
-- Run this in Supabase SQL Editor

-- VIP Dashboard Previews table
CREATE TABLE IF NOT EXISTS public.vip_dashboard_previews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('latest_signal', 'expert_insight')),
  -- For latest_signal
  symbol TEXT,
  action TEXT CHECK (action IN ('BUY', 'SELL')),
  price TEXT,
  -- For expert_insight
  text_en TEXT,
  text_ar TEXT,
  -- Common fields
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_vip_previews_type ON public.vip_dashboard_previews(type);
CREATE INDEX IF NOT EXISTS idx_vip_previews_is_active ON public.vip_dashboard_previews(is_active);

-- RLS is disabled for this table
-- Access is controlled through the API layer (admin-only)
-- No RLS policies needed

-- Trigger to automatically update updated_at
CREATE TRIGGER update_vip_previews_updated_at BEFORE UPDATE ON public.vip_dashboard_previews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


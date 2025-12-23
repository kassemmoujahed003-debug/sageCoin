-- Add status column to transactions table
-- Run this in Supabase SQL Editor after creating the transactions table

-- Add status column with default 'pending'
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'pending' 
CHECK (status IN ('pending', 'done', 'rejected'));

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Policy: Allow admins to update transaction status
CREATE POLICY "Admins can update transactions"
  ON transactions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );


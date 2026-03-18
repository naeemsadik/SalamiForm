-- Fix RLS policy for questions table to allow public REST API access
-- The issue is that authenticated policies don't work well with unauthenticated REST clients
-- Solution: Disable RLS on questions table since it's public data, and admin auth is handled via bearer tokens

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;

-- Drop the problematic RLS policies on questions
DROP POLICY IF EXISTS "Anyone can read active questions" ON questions;
DROP POLICY IF EXISTS "Admin can manage questions" ON questions;

-- Instead, rely on direct database access control at the API level
-- Admin write protection is enforced by the /api/admin routes which check bearer tokens

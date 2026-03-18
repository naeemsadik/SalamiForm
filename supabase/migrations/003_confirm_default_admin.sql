-- Confirm the default admin account so password login works immediately.
-- This is scoped to the configured admin email only.
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email = 'naeemeid@gmail.com';

-- Ensure the admin mapping exists and is enabled for the confirmed account.
INSERT INTO public.admin_users (id, email, full_name, is_admin)
SELECT id, email, 'Naeem Eid', TRUE
FROM auth.users
WHERE email = 'naeemeid@gmail.com'
ON CONFLICT (email)
DO UPDATE SET
  is_admin = TRUE,
  full_name = EXCLUDED.full_name;

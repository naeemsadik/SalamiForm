-- Create function to add admin user after signup
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'naeemeid@gmail.com' THEN
    INSERT INTO public.admin_users (id, email, full_name, is_admin)
    VALUES (NEW.id, NEW.email, 'Naeem Eid', TRUE)
    ON CONFLICT (email) DO UPDATE SET is_admin = TRUE;
  ELSE
    INSERT INTO public.admin_users (id, email, full_name, is_admin)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', FALSE)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();

-- Function to get user stats for admin dashboard
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS TABLE (
  total_submissions BIGINT,
  total_questions BIGINT,
  active_questions BIGINT,
  last_submission_date TIMESTAMP WITH TIME ZONE
) 
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    COUNT(DISTINCT s.id)::BIGINT as total_submissions,
    COUNT(DISTINCT q.id)::BIGINT as total_questions,
    COUNT(DISTINCT CASE WHEN q.is_active THEN q.id END)::BIGINT as active_questions,
    MAX(s.created_at)::TIMESTAMP WITH TIME ZONE as last_submission_date
  FROM submissions s
  CROSS JOIN questions q;
$$;

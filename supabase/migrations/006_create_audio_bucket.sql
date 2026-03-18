-- Create eid-audio storage bucket for voice recordings
INSERT INTO storage.buckets (id, name, public)
VALUES ('eid-audio', 'eid-audio', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the bucket
CREATE POLICY "Anyone can view audio files" ON storage.objects
  FOR SELECT USING (bucket_id = 'eid-audio');

CREATE POLICY "Anyone can upload audio files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'eid-audio');

-- Set CORS configuration for the bucket (allow all origins for browser uploads)
-- Note: CORS is managed via Supabase Storage settings, not SQL

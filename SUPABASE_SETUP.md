# 🔥 Supabase Setup Guide

This guide walks you through setting up Supabase for the Eid Salami form.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up or log in with GitHub
4. Click **"New Project"**
5. Fill in details:
   - **Project Name**: `eid-salami` (or your preference)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
6. Click **"Create new project"**
7. Wait for project to initialize (2-3 minutes)

## 2. Create Database Table

Once your project is ready:

1. Go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  reaction_when_seen TEXT NOT NULL,
  first_interaction TEXT NOT NULL,
  text_reaction TEXT NOT NULL,
  language_guess TEXT NOT NULL,
  nickname TEXT NOT NULL,
  eidi_amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security (RLS) - Allow anyone to insert
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert"
  ON submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read"
  ON submissions
  FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_created_at ON submissions(created_at DESC);
CREATE INDEX idx_name ON submissions(name);
```

4. Click **"Run"** (or press Cmd+Enter)
5. You should see "Success" message

## 3. Create Storage Bucket for Audio

1. Go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Name: `eid-audio` (exact name important!)
4. Click **"Create bucket"**
5. Select the bucket, then click **"Policies"**
6. Click **"Create policy"**
7. Choose **"Policy templates"** → **"Public bucket"**
8. Click **"Use this template"**
9. Click **"Review"** then **"Save policy"**

## 4. Get API Credentials

1. Go to **Project Settings** (gear icon, bottom left)
2. Click **"API"**
3. You'll see:
   - **Project URL** → Copy this to `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → Copy this to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These are "public" keys meant for client-side use. Never expose your `service_role` key!

## 5. Configure Environment Variables

In your project root, create `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Save the file. Next.js will pick it up automatically.

## 6. Test Connection

Run the dev server:

```bash
npm run dev
```

Go to http://localhost:3000 and try:
1. Click "Start the chaos"
2. Fill out the form
3. Submit

If a submission record appears in Supabase **Database** → **submissions** table, you're all set! 🎉

## 🔍 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists
- Verify variable names match exactly (case-sensitive!)
- Restart dev server after changing `.env.local`

### "Auth error"
- Your keys might be backwards (URL and Key swapped)
- Copy fresh keys from Project Settings > API

### Audio upload fails
- Check storage bucket is named exactly `eid-audio`
- Verify RLS policy allows public insert
- File size under 10MB?

### Form won't submit
- Open browser console (F12) for error messages
- Check browser network tab for failed requests
- Verify table exists in Supabase dashboard

### Submissions table is empty
- Make sure you ran the SQL query fully
- Check table created in **Database** → **Tables**
- Form submission might have failed (check console)

## 📊 Monitoring Submissions

View submitted data:

1. Go to **Database** → **submissions** table
2. You'll see all submissions with:
   - Elder's name
   - Your relationship
   - All form answers
   - Audio URL (if uploaded)
   - Timestamp

### Export Data

Click **three dots** next to table name → **Download as CSV** to export.

## 🔐 Security Notes

- ✅ These keys are safe in `.env.local` (git-ignored)
- ✅ Keys work only for client-side operations you allow
- ✅ Row Level Security (RLS) controls what's possible
- ❌ Never commit `.env.local` to git
- ❌ Never share your `service_role` key publicly
- ❌ Never expose keys in frontend code with console.log()

## 🚀 Advanced: Custom Domain

Want your own domain like `submissions.yourname.com`?

1. Buy domain (Vercel, Namecheap, etc.)
2. In Supabase → **Project Settings** → **Add custom domain**
3. Follow DNS setup instructions
4. Update `NEXT_PUBLIC_SUPABASE_URL` to custom domain

## 📖 More Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

Questions? Check [Supabase Discord](https://discord.supabase.com) for community help!

# ⚡ Quick Start (5 minutes)

Get the Eid Salami form up and running in 5 minutes!

## Step 1: Clone & Install (1 min)

```bash
# Already done? Skip to Step 2 ↓

npm install
```

## Step 2: Supabase Account (2 mins)

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create new project
4. **WAIT** for it to initialize (2-3 minutes)

## Step 3: Create Database Table (1 min)

In your Supabase project:

1. Go to **SQL Editor**
2. New Query
3. Copy-paste this:

```sql
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
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read" ON submissions FOR SELECT USING (true);
```

4. Click **Run**
5. ✅ Done!

## Step 4: Create Storage for Audio (30 secs)

1. Go to **Storage**
2. **Create bucket** → name: `eid-audio`
3. Click bucket → **Policies**
4. **Create policy** → **Public bucket template** → **Save**

## Step 5: Get API Keys (30 secs)

1. Go to **Project Settings** (⚙️ icon)
2. Click **API**
3. Copy:
   - **Project URL** 
   - **anon public** key

## Step 6: Configure Env (30 secs)

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=<paste project url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste anon key>
```

Save file!

## Step 7: Run! (10 secs)

```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## ✅ Verification

1. See landing page with "Eid Salami Protocol" title
2. Click "Start the chaos →"
3. Fill 1-2 fields
4. Click Submit
5. Check Supabase **Database** → **submissions** table
6. See your submission appear! 🎉

---

## 🆘 Stuck?

**"Missing Supabase environment variables"**
- Check `.env.local` exists
- Restart dev server

**"Form won't submit"**
- Open DevTools (F12) → Console
- Look for error messages
- Check Supabase table exists

**"Audio upload fails"**
- Make sure storage bucket is `eid-audio` (exact name!)
- Bucket must be Public

---

## 📚 Full Docs

- [Setup Guide](./README_SETUP.md) - Detailed setup
- [Supabase Setup](./SUPABASE_SETUP.md) - Database guide
- [Development Guide](./DEVELOPMENT.md) - Extend the project
- [Main README](./README.md) - Project overview

---

That's it! You're ready to collect Eid tributes 🎉

Next: Customize the colors, add more form fields, and share it with family!

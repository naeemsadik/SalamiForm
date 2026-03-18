# 🎯 Admin Panel & Dynamic Questions - Quick Setup Guide

## What's New? 🆕

Your Eid Salami form now has a **powerful admin panel** that lets you:

✅ **Add unlimited questions** without touching code  
✅ **Choose question types**: Text, Textarea, MCQ, Slider, Audio  
✅ **Add helper text** under each question for guidance  
✅ **View all submissions** in real-time  
✅ **Edit or deactivate questions** anytime  

---

## 🚀 First-Time Setup (5 Steps)

### 1️⃣ Install & Run

```bash
npm install
npm run dev
```

### 2️⃣ Setup Supabase

**Option A: Using CLI (Automatic)**
```bash
npm install --save-dev supabase
npx supabase init
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_ID
npx supabase db push  # This deploys migrations automatically!
```

**Option B: Manual (Web Dashboard)**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Run contents of `supabase/migrations/001_init_schema.sql`
5. Run contents of `supabase/migrations/002_admin_setup.sql`
6. Create storage bucket named `eid-audio` (make it public)

### 3️⃣ Add Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 4️⃣ Access Admin Panel

Visit: **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**

**Login with:**
- Email: `naeemeid@gmail.com`
- Password: `naseid2026`

### 5️⃣ Add Your First Custom Question

In admin dashboard:
1. Click **"Questions"** tab
2. Click **"+ New"** button
3. Fill in the form:
   - **Question text**: (e.g., "What's your favorite dessert?")
   - **Helper text**: (e.g., "Share what they love!")
   - **Question type**: Choose "text" / "textarea" / "mcq" / "slider" / "audio"
   - **Order**: Position in form (e.g., 11 for after current 10)
4. Click **"Create Question"**

Done! ✅ Users will now see your question in the form.

---

## 📊 Database Architecture (NEW!)

### Flexible Questions Table
```sql
- question_text: The actual question
- helper_text: Guidance below the question
- question_type: text | textarea | mcq | slider | audio
- options: JSON for MCQ choices
- order_index: Display order
- is_active: Show/hide without deletion
```

### All Answers Stored as TEXT
- Plain text answers
- JSON responses  
- Audio file URLs
- No restrictions on format!

### Automatic Admin Setup
- Email `naeemeid@gmail.com` = admin
- Auto-created on first signup
- Secure with Supabase RLS

---

## 🎨 Color Theme (Updated!)

Your form now uses:
- **Brick Red** (#cc3c4c) - Primary brand
- **Gold** (#facd96) - Accent/highlights
- **Deep Purple** (#3c1c94) - Secondary

All updated throughout UI:
- Gradients
- Buttons
- Animations
- Backgrounds

---

## 📝 Adding Questions via Admin

### Text Input
```
Question text: "What's their full name?"
Helper text: "First and last name, please"
Question type: "text"
```

### Multiple Choice
```
Question text: "Relationship"
Helper text: "How are they related to you?"
Question type: "mcq"
Options: 
  - Label: "Grandmother", Value: "grandmother"
  - Label: "Grandfather", Value: "grandfather"
  - Label: "Cousin", Value: "cousin"
```

### Slider
```
Question text: "How much Eidi? (PKR)"
Helper text: "Slide to show appreciation"
Question type: "slider"
(Min/max automatically 0-100000)
```

### Audio Upload
```
Question text: "Record a voice message"
Helper text: "Send them love through your voice!"
Question type: "audio"
(Max 15 seconds handled automatically)
```

---

## 🔐 Admin Credentials

**Default Login:**
- Email: `naeemeid@gmail.com`
- Password: `naseid2026`

⚠️ **IMPORTANT**: Change these credentials immediately in production!

To change:
1. Login to Supabase
2. Go to Authentication → Users
3. Edit admin user
4. Change password

---

## 📊 Viewing Submissions

In admin dashboard:
1. Click **"Submissions"** tab
2. See list of all submissions
3. Click any submission to expand
4. View all answers per user

Each answer shows:
- The question text
- The user's response
- Question type
- Timestamp

---

## 🛠️ Common Tasks

### Hide a Question (Don't Delete)
1. Select question in Questions tab
2. Click **"Deactivate"**
3. Users won't see it anymore

### Get Question Back
1. Click the inactive question
2. Click **"Activate"**
3. Done!

### Update Question Text
1. Click question to select
2. Delete old question
3. Create new question with updated text
4. Adjust order if needed

### Export All Answers
1. Go to Supabase dashboard
2. Query: `SELECT * FROM submission_answers`
3. Download as CSV

---

## 🚀 Deploy to Production

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Production ready"
git push

# 2. Import to Vercel dashboard
# Choose your repo and deploy

# 3. Add environment variables
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 4. Done! Site is live
```

### With Supabase Deployed
Supabase CLI automatically handles database migration to production.

---

## ❓ Common Questions

**Q: Can I change admin email?**  
A: Yes, go to Supabase Auth → Users → Edit email

**Q: Can users see current questions without submitting?**  
A: No, they only see questions in the form they must complete

**Q: Can I delete answers?**  
A: Yes, via Supabase dashboard (use caution!)

**Q: How many questions can I have?**  
A: Unlimited! Add as many as you want

**Q: Can I reorder questions after creating?**  
A: Yes, update the `order_index` value for each question

**Q: Do old submissions get updated if I change questions?**  
A: No, old submissions stay the same. New submissions use new questions.

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| Form (User View) | `http://localhost:3000` |
| Admin Login | `http://localhost:3000/admin/login` |
| Admin Dashboard | `http://localhost:3000/admin/dashboard` |
| Supabase Dashboard | [supabase.com](https://supabase.com) |
| Repository | Your GitHub repo |

---

## 📞 Support Checklist

Before asking for help:
- ✅ Did you run `supabase db push` or run both SQL files?
- ✅ Did you create `.env.local` with correct credentials?
- ✅ Did you login with correct admin email?
- ✅ Are new questions set to `is_active = true`?
- ✅ Is the form using questions from database?

---

## 🎊 You're All Set!

Your admin panel is live! Now you can:

1. ✅ Add questions dynamically
2. ✅ Control all content from dashboard
3. ✅ View live submissions
4. ✅ Theme matches brick red + gold design
5. ✅ Helper text guides your users

**Happy form customizing! 🚀**

---

**Questions? Check [README.md](README.md) for full documentation**

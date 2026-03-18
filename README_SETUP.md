# 🎉 Eid Salami Protocol - Interactive Form

A premium, meme-style Eid Salami tribute form built with **Next.js**, **Tailwind CSS**, **Framer Motion**, and **Supabase**. Every pixel, animation, and interaction is intentional.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works great)

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - In your project dashboard, go to **SQL Editor**
   - Run this SQL to create the `submissions` table:

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
   ```

3. **Create Storage bucket for audio**
   - Go to **Storage** in your Supabase dashboard
   - Create a new bucket called `eid-audio`
   - Set it to **Public** so users can access uploaded files
   - Go to **Policies** and enable public read access

4. **Configure environment variables**
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Add your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`: Get from Project Settings → API
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Get from Project Settings → API

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── page.tsx           # Main orchestrator
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Global styles
├── components/
│   ├── GlassCard.tsx      # Glass morphism card
│   ├── GradientButton.tsx  # Animated button
│   ├── OptionCard.tsx     # MCQ option card
│   ├── ProgressBar.tsx    # Top progress indicator
│   ├── LandingPage.tsx    # Home screen
│   ├── FormEngine.tsx     # Multi-step form orchestrator
│   ├── SuccessScreen.tsx  # Victory screen
│   └── forms/             # Individual form step components
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── confetti.json      # Lottie confetti animation
├── hooks/
│   └── useAudioUpload.ts  # Audio upload logic
└── types/
    └── index.ts           # TypeScript types & Zod schemas
```

## 🎨 Design System

### Components

1. **GlassCard** - Glass morphism container
   - Rounded-3xl with backdrop blur
   - Soft shadow and hover glow effect
   
2. **GradientButton** - Purple→Pink gradient button
   - Rounded-full with hover scale
   - Glow effect on interaction

3. **OptionCard** - MCQ card with selection state
   - Smooth transitions
   - Gradient border when selected

4. **ProgressBar** - Fixed top progress indicator
   - Smooth animated width
   - Gradient fill animation

### Colors

- **Primary**: Purple (#a855f7)
- **Accent**: Pink (#ec4899)
- **Background**: Dark gradient (black → purple → black)

### Typography

- **Font**: Space Grotesk (modern, geometric)
- **Weights**: 400, 500, 600, 700

## 📝 Form Steps

The form has 10 steps:

1. **Name** - Text input
2. **Relationship** - MCQ (Grandmother/Grandfather/Parent/Uncle-Aunty)
3. **Reaction When Seen** - MCQ with emojis (Joy/Hug/Emotional/Laughed)
4. **First Interaction** - MCQ (Gave Money/Made Food/Talked/Asked About Exams)
5. **Text Reaction** - Textarea (what they said)
6. **Language Guess** - MCQ (Urdu/Punjabi/Pashto/English/Mix)
7. **Nickname** - Text input
8. **Eidi Amount** - Slider with emoji reactions
9. **Reason** - Textarea (why they deserve love)
10. **Audio Upload** - Drag & drop audio file upload (max 15 seconds)

## 🎬 Animations

- **Step Transitions**: Slide right + fade in
- **Button Hover**: Scale 1.05 with glow
- **Button Click**: Scale 0.95 (press effect)
- **Input Focus**: Border glow + bg highlight
- **Progress Bar**: Smooth width animation
- **Emoji Reactions**: Spring animation on change
- **Background**: Gradient shift animation
- **Confetti**: Lottie animation on success

## 🔊 Audio Upload

- **Drag & drop** or click to upload
- **Max duration**: 15 seconds
- **Supported formats**: MP3, WAV, M4A
- **Storage**: Supabase Storage (public URL)

## 🎯 Validation

All fields have Zod validation with playful error messages:
- "You can't skip this. I'm watching 👀"
- "Say something meaningful... even if it's chaotic 😂"
- "No robotic Eid Mubarak allowed"

## 🔐 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Both are "public" (NEXT_PUBLIC_) because they're meant to be client-side only. Never expose your service_role key!

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t eid-salami .
docker run -p 3000:3000 eid-salami
```

## 📊 Database Schema

### submissions table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | TEXT | Elder's name |
| relationship | TEXT | Relation (grandmother/grandfather/etc) |
| reaction_when_seen | TEXT | Their reaction emoji category |
| first_interaction | TEXT | What they did first |
| text_reaction | TEXT | What they said |
| language_guess | TEXT | Guessed language |
| nickname | TEXT | Their nickname for user |
| eidi_amount | INTEGER | Predicted Eidi in PKR |
| reason | TEXT | Why they deserve love |
| audio_url | TEXT | Optional: Eid Salam audio URL |
| created_at | TIMESTAMP | Submission timestamp |

## 🛠️ Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Confetti**: Lottie React

## 📱 Responsive Design

- Mobile-first approach
- Tailwind breakpoints
- Touch-optimized buttons
- Adaptive font sizes

## ✨ Accessibility

- Semantic HTML
- Focus states on interactions
- Color contrast ratios met
- Keyboard navigation support

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize!

## 📝 License

MIT - Use freely for personal or commercial projects

## 🎉 Fun Facts

- **Meme-style design** with playful copy
- **Zero boring Google Form vibes**
- **Premium UI/UX throughout**
- **Every animation intentional**
- **Built with ❤️ for Eid celebrations**

---

Made with chaos and ✨ for honoring our elders

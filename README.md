# 🎉 Eid Salami Protocol

> A **premium, meme-style interactive form** for honoring elders with beautifully crafted UI/UX, smooth animations, and playful copy.

Built with **Next.js**, **Tailwind CSS**, **Framer Motion**, **React Hook Form**, **Zod**, and **Supabase**.

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black)](https://nextjs.org)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-blue)](https://tailwindcss.com)
[![Animated with Framer Motion](https://img.shields.io/badge/Animated%20with-Framer%20Motion-purple)](https://www.framer.com/motion/)

## 🚀 Get Started in 5 Minutes

**[→ Jump to Quick Start](QUICKSTART.md)**

Copy-paste one SQL query, add env variables, and you're live!

---

## ✨ What's Inside?

### 🌟 Features
- **10-step multi-step form** with smooth animations
- **Drag & drop audio upload** (max 15 seconds)
- **Animated slider** with emoji reactions
- **Glass morphism design** with gradient buttons
- **Real-time validation** with playful error messages
- **Confetti animation** on success
- **100% responsive** mobile-first design
- **Production-ready** Supabase integration

### 🎨 Premium UI/UX
- Animated gradient background
- Smooth page transitions
- Hover glow effects
- Spring animations on interactions
- Custom slider with live emoji feedback
- Loading overlay during submission
- Glass cards with backdrop blur

### 🔥 No Boring Form Energy
- Playful copy: "You can't skip this. I'm watching 👀"
- Meme-style design
- Fun emojis everywhere
- Every interaction intentional
- Premium feel throughout

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | ⚡ Get running in 5 minutes |
| **[README_SETUP.md](README_SETUP.md)** | 📋 Detailed setup guide |
| **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** | 🔥 Database & storage setup |
| **[FEATURES.md](FEATURES.md)** | ✨ Complete feature breakdown |
| **[DEVELOPMENT.md](DEVELOPMENT.md)** | 🛠️ Extend & customize |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | 🛡️ Fix common issues |

**→ Pick a guide above to get started!**

---

## 🎯 Form Walkthrough

### Pages
1. **Landing** - Hero screen with CTA
2. **Form** - 10-step multi-step form
3. **Success** - Confetti celebration screen

### The 10 Steps
1. Elder's name
2. Relationship (grandmother, grandfather, etc.)
3. Their reaction when you appeared
4. Their first action/interaction
5. What they said about you
6. Language they spoke
7. Their nickname for you
8. Predicted Eidi amount (with emoji reactions)
9. Why they deserve your love
10. Your Eid Salam (audio upload)

---

## 🛠️ Tech Stack

```
Frontend:
├── Next.js 16+        (React framework)
├── TypeScript         (Type safety)
├── Tailwind CSS       (Styling)
├── Framer Motion      (Animations)
├── React Hook Form    (Form management)
└── Zod                (Validation)

Backend:
├── Supabase           (Database + Auth)
├── PostgreSQL         (Data storage)
└── Supabase Storage   (Audio files)

Deployment:
├── Vercel             (Recommended)
├── Docker             (Self-hosted)
└── GitHub             (Version control)
```

---

## 📦 Project Structure

```
📁 eid/
├── 📁 app/
│   ├── page.tsx              # Main orchestrator
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── not-found.tsx         # 404 page
├── 📁 components/
│   ├── GlassCard.tsx         # UI primitive
│   ├── GradientButton.tsx    # UI primitive
│   ├── OptionCard.tsx        # UI primitive
│   ├── ProgressBar.tsx       # UI primitive
│   ├── LandingPage.tsx       # Landing screen
│   ├── FormEngine.tsx        # Form orchestrator
│   ├── SuccessScreen.tsx     # Success screen
│   ├── LoadingOverlay.tsx    # Loading state
│   └── forms/                # Form step components
├── 📁 lib/
│   ├── supabase.ts           # Supabase client
│   ├── utils.ts              # Utilities
│   └── confetti.json         # Lottie JSON
├── 📁 hooks/
│   └── useAudioUpload.ts     # Audio upload hook
├── 📁 types/
│   └── index.ts              # TypeScript + Zod schemas
├── tailwind.config.ts        # Tailwind config
├── next.config.ts            # Next.js config
├── tsconfig.json             # TypeScript config
├── .env.example              # Env template
└── package.json              # Dependencies
```

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Install
npm install

# 2. Set up Supabase (see QUICKSTART.md)
# → Create project
# → Run SQL query for table
# → Create storage bucket
# → Get API keys

# 3. Configure
# Create .env.local with your Supabase keys

# 4. Run
npm run dev

# 5. Open browser
# → http://localhost:3000
```

**[Full Quick Start →](QUICKSTART.md)**

---

## 🎨 Design System

### Colors
- **Primary**: Purple (#a855f7)
- **Accent**: Pink (#ec4899)
- **Background**: Dark gradient

### Components
- **GlassCard** - Container with blur effect
- **GradientButton** - Purple→Pink button
- **OptionCard** - MCQ card with selection
- **ProgressBar** - Top progress indicator

### Typography
- **Font**: Space Grotesk (modern, geometric)
- **Responsive** text sizing with Tailwind

---

## 🎬 Animations & Interactions

- Page transitions with fade + slide
- Button hover scale + glow
- Option selection with spring animation
- Slider emoji reactions (4 states)
- Loading spinner animation
- Confetti animation on success
- Smooth input focus effects

---

## 🔒 Security

✅ **Already Handled**
- Environment variables kept private
- Client-side validation with Zod
- Audio file validation (type + duration)
- Supabase Row Level Security (RLS)
- Public API keys for safe client-side use
- No sensitive data exposed

---

## 📱 Responsive Design

- **Mobile-first** approach
- **Touch-optimized** buttons
- **Flexible grids** for options
- **Adaptive text** sizes
- Tested on all modern browsers

---

## 🚀 Deployment

### Vercel (1-click)
```bash
1. Push to GitHub
2. Import to Vercel
3. Add env variables
4. Deploy!
```

### Self-hosted
```bash
docker build -t eid-salami .
docker run -p 3000:3000 eid-salami
```

---

## 📊 Database Schema

### `submissions` table
| Column | Type | Purpose |
|--------|------|---------|
| id | UUID | Primary key |
| name | TEXT | Elder's name |
| relationship | TEXT | Relation type |
| reaction_when_seen | TEXT | Their reaction |
| first_interaction | TEXT | First action |
| text_reaction | TEXT | What they said |
| language_guess | TEXT | Language spoken |
| nickname | TEXT | Their nickname |
| eidi_amount | INT | Proposed Eidi |
| reason | TEXT | Why deserving |
| audio_url | TEXT | Audio file URL |
| created_at | TIMESTAMP | Submission time |

---

## 🤔 FAQ

**Q: Can I customize the form steps?**  
A: Yes! [See DEVELOPMENT.md](DEVELOPMENT.md) for adding/removing steps.

**Q: How do I collect responses as CSV?**  
A: Supabase dashboard → Table → Download CSV

**Q: Can I add authentication (require login)?**  
A: Yes, [see DEVELOPMENT.md](DEVELOPMENT.md) for Supabase Auth integration.

**Q: What if audio upload fails?**  
A: [See TROUBLESHOOTING.md](TROUBLESHOOTING.md) for solutions.

**Q: Can I deploy without Vercel?**  
A: Yes! Docker, Heroku, Railway, etc. all work.

---

## 📖 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

## 🎁 What's Special?

Unlike generic form builders, this is:
- ✨ **Premium design** - Every pixel intentional
- 🎬 **Smooth animations** - No janky transitions
- 😂 **Playful copy** - Fun error messages
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Optimized performance
- 🔒 **Secure** - Validation + RLS
- 🎯 **Purposeful** - Built for celebration

---

## 📝 License

MIT - Use freely for personal or commercial projects

---

## 🎉 Built with ❤️

Created to honor elders and celebrate Eid with **premium, intentional design**.

---

## 🚀 Next Steps

1. **[Read QUICKSTART.md](QUICKSTART.md)** (5 minutes) → Get running
2. **[Check FEATURES.md](FEATURES.md)** → See what's possible
3. **[Review SUPABASE_SETUP.md](SUPABASE_SETUP.md)** → Understand database
4. **[Explore DEVELOPMENT.md](DEVELOPMENT.md)** → Customize for your needs
5. **[Browse TROUBLESHOOTING.md](TROUBLESHOOTING.md)** → Fix issues

**Go build something amazing! 🚀**

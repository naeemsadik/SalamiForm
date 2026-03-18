# 🛠️ Development Guide

This guide is for developers who want to extend or customize the Eid Salami form.

## Project Structure Deep Dive

```
project/
├── app/
│   ├── page.tsx              # Main orchestrator (Landing → Form → Success)
│   ├── layout.tsx            # Root layout with Space Grotesk font
│   ├── globals.css           # Global styles & animations
│   └── not-found.tsx         # 404 page
├── components/
│   ├── GlassCard.tsx         # Reusable glass container
│   ├── GradientButton.tsx    # Purple→Pink gradient button
│   ├── OptionCard.tsx        # MCQ option with selection state
│   ├── ProgressBar.tsx       # Top progress indicator
│   ├── LandingPage.tsx       # Hero landing screen
│   ├── FormEngine.tsx        # Multi-step form orchestrator
│   ├── SuccessScreen.tsx     # Victory/confetti screen
│   ├── LoadingOverlay.tsx    # Submission loading overlay
│   ├── forms/
│   │   ├── TextInputStep.tsx       # Single-line text input
│   │   ├── MCQStep.tsx             # Multiple choice questions
│   │   ├── TextareaStep.tsx        # Auto-expanding text area
│   │   ├── SliderStep.tsx          # Range slider with emoji
│   │   ├── AudioUploadStep.tsx     # Drag & drop audio upload
│   │   └── index.ts                # Forms barrel export
│   └── index.ts              # Component barrel exports
├── lib/
│   ├── supabase.ts           # Supabase client initialization
│   ├── utils.ts              # Utility functions
│   └── confetti.json         # Lottie confetti animation JSON
├── hooks/
│   ├── useAudioUpload.ts     # Audio upload with validation
│   └── index.ts              # Hook barrel exports
├── types/
│   └── index.ts              # TypeScript types & Zod schemas
├── tailwind.config.ts        # Custom colors, fonts, animations
├── next.config.ts            # Next.js optimization config
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
├── .env.example              # Environment variable template
├── SUPABASE_SETUP.md         # Supabase setup instructions
└── README_SETUP.md           # Project setup guide
```

## Adding New Form Steps

### 1. Create Component

Create `components/forms/FooStep.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface FooStepProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FooStep({ label, value, onChange, error }: FooStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Your component content */}
      {error && <p className="text-red-400">{error}</p>}
    </motion.div>
  );
}
```

### 2. Update Zod Schema

In `types/index.ts`, add to `formSchema`:

```typescript
export const formSchema = z.object({
  // ... existing fields ...
  foo_field: z.string().min(1, "This field is required"),
});
```

### 3. Add Database Column

Run in Supabase SQL Editor:

```sql
ALTER TABLE submissions
ADD COLUMN foo_field TEXT;
```

### 4. Add Step to FormEngine

In `components/FormEngine.tsx`, add to `FORM_STEPS`:

```typescript
const FORM_STEPS = [
  // ... existing steps ...
  {
    id: "foo_field",
    title: "Your Question",
    placeholder: "Your placeholder text",
  },
];
```

Then add case to `renderStep()`:

```typescript
case "foo_field":
  return (
    <FooStep
      label={currentStep.title}
      value={(stepValue as string) || ""}
      onChange={(val) =>
        setValue("foo_field", val as any)
      }
      error={errors.foo_field?.message as string | undefined}
    />
  );
```

### 5. Update page.tsx

In `app/page.tsx`, add field to insert:

```typescript
const { data: insertedData } = await supabase
  .from("submissions")
  .insert({
    // ... existing fields ...
    foo_field: data.foo_field,
  })
```

## Customizing Design

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: "#your-new-color",
  },
}
```

### Fonts

In `app/layout.tsx`, import different Google Font:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

### Animations

Add to `tailwind.config.ts` `keyframes`:

```typescript
keyframes: {
  yourAnimation: {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
}
```

Use in components:

```tsx
<motion.div animate={{ scale: [1, 1.1, 1] }} />
```

## Extending Supabase

### Add Authentication

```typescript
import { supabase } from "@/lib/supabase";

// Sign up
const { error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password",
});

// Sign in
const { data } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

### Real-time Subscriptions

```typescript
const subscription = supabase
  .from("submissions")
  .on("*", (payload) => {
    console.log("Change received!", payload);
  })
  .subscribe();
```

### Storage Operations

```typescript
// Upload
const { data } = await supabase.storage
  .from("bucket-name")
  .upload("path/file.txt", file);

// List
const { data: files } = await supabase.storage
  .from("bucket-name")
  .list("path/");

// Download
const { data } = await supabase.storage
  .from("bucket-name")
  .download("path/file.txt");
```

## Testing

### Unit Tests (Jest)

Install:
```bash
npm install --save-dev jest @testing-library/react
```

Create `__tests__/GlassCard.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { GlassCard } from "@/components/GlassCard";

describe("GlassCard", () => {
  it("renders children", () => {
    render(<GlassCard>Test</GlassCard>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

Run:
```bash
npm run test
```

### Integration Tests

Test Supabase interactions:

```typescript
import { supabase } from "@/lib/supabase";

test("can submit form", async () => {
  const { data, error } = await supabase
    .from("submissions")
    .insert({ name: "Test", /* ... */ })
    .select()
    .single();

  expect(error).toBeNull();
  expect(data).toBeDefined();
});
```

## Performance Optimization

### Code Splitting

Use dynamic imports for heavy components:

```typescript
const FormEngine = dynamic(() =>
  import("@/components/FormEngine").then((mod) => ({
    default: mod.FormEngine,
  }))
);
```

### Image Optimization

In `next.config.ts`:

```typescript
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

### Bundle Analysis

Install:
```bash
npm install --save-dev @next/bundle-analyzer
```

Use in `next.config.ts`:

```typescript
const withBundleAnalyzer = require("@next/bundle-analyzer")();
module.exports = withBundleAnalyzer(nextConfig);
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add env variables
4. Deploy!

### Self-hosted (Docker)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t eid-salami .
docker run -p 3000:3000 eid-salami
```

## Debugging

### Browser DevTools

- F12 to open DevTools
- Console tab for logs
- Network tab for API calls
- Performance tab for optimizations

### Vercel Analytics

In Vercel dashboard:
- Real User Monitoring (RUM)
- Core Web Vitals monitoring
- Error tracking

### Supabase Logs

In Supabase dashboard:
- Go to **Logs** to see database queries
- Check **Errors** for query errors
- Monitor **API requests**

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Animations not smooth | Check Framer Motion installed correctly |
| Audio upload 413 error | Increase Supabase file size limit |
| Form won't submit | Check console for validation errors |
| Styles not applying | Restart dev server, clear `.next` cache |
| Env vars not loaded | Check `.env.local` syntax, restart dev server |

## Best Practices

1. **Keep components small** - Break into smaller pieces
2. **Use barrel exports** - Simplify imports with `index.ts`
3. **Validate early** - Use Zod for runtime validation
4. **Handle errors gracefully** - Show user-friendly messages
5. **Test regularly** - Unit + integration tests
6. **Monitor performance** - Use Vercel Analytics
7. **Document code** - Add JSDoc comments
8. **Use TypeScript** - Catch errors at compile time

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Happy coding! 🚀

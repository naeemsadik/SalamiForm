import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef5f5",
          100: "#fde8e8",
          200: "#fbd4d7",
          300: "#f8b8be",
          400: "#f49fa8",
          500: "#cc3c4c",
          600: "#b83343",
          700: "#a12a39",
          800: "#8a2230",
          900: "#6b1a27",
        },
        accent: {
          50: "#fffbf5",
          100: "#fff8ed",
          200: "#fef0dc",
          300: "#fce5c8",
          400: "#fbdab4",
          500: "#facd96",
          600: "#f8b870",
          700: "#f49d44",
          800: "#e98a2e",
          900: "#d97717",
        },
        secondary: {
          50: "#f5f3fa",
          100: "#ebe5f5",
          200: "#d5c2ea",
          300: "#ba9ade",
          400: "#9d72d2",
          500: "#3c1c94",
          600: "#36187d",
          700: "#2f1466",
          800: "#28104f",
          900: "#200c38",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backdropBlur: {
        xl: "36px",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        glow: "0 0 20px rgba(204, 60, 76, 0.5)",
        "glow-accent": "0 0 20px rgba(250, 205, 150, 0.5)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-right": "slide-right 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(204, 60, 76, 0.5)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 30px rgba(204, 60, 76, 0.8)" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-right": {
          from: { transform: "translateX(-20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-left": {
          from: { transform: "translateX(20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

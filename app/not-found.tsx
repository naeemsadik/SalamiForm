"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GradientButton } from "@/components/GradientButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-7xl mb-6"
        >
          🤔
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Lost in Translation?
        </h1>

        <p className="text-xl text-white/70 mb-8">
          This page doesn't exist. Maybe the Elder forgot to tell us about it! 😅
        </p>

        <Link href="/">
          <GradientButton className="text-lg px-10 py-4">
            Back to Eid Protocol →
          </GradientButton>
        </Link>

        {/* Floating emojis */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 text-4xl"
        >
          ❓
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-4xl"
        >
          ✨
        </motion.div>
      </motion.div>
    </div>
  );
}

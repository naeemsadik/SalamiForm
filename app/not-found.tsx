"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GradientButton } from "@/components/GradientButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-primary-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl mb-6 text-white/70"
        >
          404
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Lost in Translation?
        </h1>

        <p className="text-xl text-white/70 mb-8">
          This page does not exist.
        </p>

        <Link href="/">
          <GradientButton className="text-lg px-10 py-4">
            Back to Home
          </GradientButton>
        </Link>
      </motion.div>
    </div>
  );
}

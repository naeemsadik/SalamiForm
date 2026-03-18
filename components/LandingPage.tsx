"use client";

import { motion } from "framer-motion";
import { GradientButton } from "@/components/GradientButton";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Animated gradient background */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900 bg-[length:400%_400%] -z-10"
      />

      {/* Animated orbs for extra flair */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -z-10"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl -z-10"
      />

      {/* Content */}
      <div className="text-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Eid Salami Protocol 🎉
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
            Fill carefully. Your Eidi depends on your answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GradientButton onClick={onStart} className="text-lg px-10 py-4">
              Start the chaos →
            </GradientButton>
          </motion.div>
        </motion.div>

        {/* Floating emoji decorations */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 text-4xl"
        >
          🎁
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-4xl"
        >
          💚
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, delay: 1, repeat: Infinity }}
          className="absolute top-1/3 -right-5 text-4xl md:text-5xl"
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
}

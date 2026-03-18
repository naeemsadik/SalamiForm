"use client";

import { motion } from "framer-motion";
import { GradientButton } from "@/components/GradientButton";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative px-4 py-10 sm:py-14">
      {/* Animated gradient background */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-gradient-to-br from-primary-900 via-black to-secondary-900 bg-[length:400%_400%] -z-10"
      />

      {/* Animated orbs for extra flair */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-8 left-0 w-40 h-40 sm:top-10 sm:left-10 sm:w-64 sm:h-64 bg-primary-600/20 rounded-full blur-3xl -z-10"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-8 right-0 w-40 h-40 sm:bottom-10 sm:right-10 sm:w-64 sm:h-64 bg-accent-600/20 rounded-full blur-3xl -z-10"
      />

      {/* Content */}
      <div className="text-center z-10 w-full max-w-3xl">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl sm:text-4xl mb-4 sm:mb-6 text-white/80"
        >
          ঈদ মোবারক!
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300 bg-clip-text text-transparent">
            সালামি পাওয়ার ফর্ম
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-base sm:text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
           এই ফর্ম ফিলাপ না করলে কোনো সালামি নাই
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
            <GradientButton onClick={onStart} className="text-base sm:text-lg w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4">
              Start
            </GradientButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

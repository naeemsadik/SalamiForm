"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5 backdrop-blur-sm">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"
      />
    </div>
  );
}

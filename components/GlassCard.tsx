"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      className={`
        rounded-3xl
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        shadow-glass
        ${hover ? "hover:shadow-glow hover:border-white/40 transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

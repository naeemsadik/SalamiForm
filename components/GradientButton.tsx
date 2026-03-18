"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function GradientButton({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: GradientButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      className={`
        px-8 py-3
        rounded-full
        font-semibold
        text-white
        bg-gradient-to-r from-primary-500 to-accent-500
        hover:shadow-glow
        transition-all duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

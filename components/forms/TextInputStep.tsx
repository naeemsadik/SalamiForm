"use client";

import { motion } from "framer-motion";

interface TextInputStepProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
}

export function TextInputStep({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
}: TextInputStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-white">{label}</h2>
      
      {helperText && (
        <p className="text-white/60 text-sm">{helperText}</p>
      )}

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          px-4 sm:px-6
          py-3 sm:py-4
          rounded-2xl
          bg-white/5
          border-2
          backdrop-blur-sm
          text-white
          text-base
          placeholder-white/40
          transition-all
          duration-300
          focus:outline-none
          ${
            error
              ? "border-red-500 focus:border-red-400"
              : "border-white/20 focus:border-primary-400 focus:shadow-glow focus:bg-white/10"
          }
        `}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

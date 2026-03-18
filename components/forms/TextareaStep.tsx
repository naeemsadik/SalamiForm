"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface TextareaStepProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  helperText?: string;
}

export function TextareaStep({
  label,
  placeholder,
  value,
  onChange,
  error,
  maxLength = 500,
  helperText,
}: TextareaStepProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 300) + "px";
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h2 className="text-3xl font-bold text-white">{label}</h2>

      {helperText && (
        <p className="text-white/60 text-sm">{helperText}</p>
      )}

      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        className={`
          w-full
          px-6
          py-4
          rounded-2xl
          bg-white/5
          border-2
          backdrop-blur-sm
          text-white
          placeholder-white/40
          transition-all
          duration-300
          focus:outline-none
          resize-none
          min-h-32
          ${
            error
              ? "border-red-500 focus:border-red-400"
              : "border-white/20 focus:border-primary-400 focus:shadow-glow focus:bg-white/10"
          }
        `}
      />

      <div className="flex justify-between items-center text-sm">
        <div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400"
            >
              {error}
            </motion.p>
          )}
        </div>
        <span className="text-white/40">
          {value.length}/{maxLength}
        </span>
      </div>
    </motion.div>
  );
}

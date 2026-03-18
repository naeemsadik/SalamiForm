"use client";

import { motion } from "framer-motion";

interface OptionCardProps {
  label: string;
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  icon?: string;
}

export function OptionCard({
  label,
  value,
  selected,
  onChange,
  icon,
}: OptionCardProps) {
  return (
    <motion.button
      onClick={() => onChange(value)}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`
        relative
        p-4
        rounded-2xl
        text-left
        transition-all
        duration-300
        border-2
        group
        ${
          selected
            ? "border-primary-400 bg-gradient-to-br from-primary-500/20 to-accent-500/20 shadow-glow"
            : "border-white/20 bg-white/5 hover:border-primary-300 hover:bg-white/10 hover:shadow-glow"
        }
      `}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <motion.span
            initial={{ scale: 1 }}
            animate={selected ? { scale: 1.2 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl"
          >
            {icon}
          </motion.span>
        )}
        <span className="font-medium">{label}</span>
      </div>

      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 shadow-glow flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}

      {/* Glow background on hover */}
      {!selected && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 blur-xl -z-10 opacity-0 group-hover:opacity-20 transition-opacity"
        />
      )}
    </motion.button>
  );
}

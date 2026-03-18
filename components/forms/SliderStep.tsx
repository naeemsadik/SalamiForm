"use client";

import { motion } from "framer-motion";

interface SliderStepProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
}

export function SliderStep({
  label,
  value,
  onChange,
  min = 0,
  max = 100000,
  step = 1,
  error,
}: SliderStepProps) {
  const getEmoji = (val: number) => {
    if (val === 0) return "😐";
    if (val < 5000) return "🙂";
    if (val < 20000) return "😊";
    if (val < 50000) return "🤑";
    return "💸";
  };

  const emoji = getEmoji(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">{label}</h2>

      <div className="flex items-center justify-center gap-4">
        <motion.span
          key={emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-5xl"
        >
          {emoji}
        </motion.span>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            w-full
            h-2
            rounded-lg
            bg-gradient-to-r from-primary-500 to-accent-500
            appearance-none
            cursor-pointer
            accent-primary-500
            ${error ? "opacity-50" : ""}
          `}
        />

        <div className="flex justify-between items-center text-white/60 text-sm">
          <span>PKR {min.toLocaleString()}</span>
          <span className="text-2xl font-bold text-primary-400">
            PKR {value.toLocaleString()}
          </span>
          <span>PKR {max.toLocaleString()}</span>
        </div>
      </div>

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

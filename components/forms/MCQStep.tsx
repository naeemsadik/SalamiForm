"use client";

import { motion } from "framer-motion";
import { OptionCard } from "@/components/OptionCard";

interface MCQOption {
  label: string;
  value: string;
  icon?: string;
}

interface MCQStepProps {
  label: string;
  options: MCQOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function MCQStep({
  label,
  options,
  value,
  onChange,
  error,
}: MCQStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">{label}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            value={option.value}
            icon={option.icon}
            selected={value === option.value}
            onChange={onChange}
          />
        ))}
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

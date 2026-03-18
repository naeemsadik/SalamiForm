"use client";

import { motion } from "framer-motion";

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({
  message = "Submitting your response...",
}: LoadingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl p-8 text-center max-w-sm"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-2xl mb-6 mx-auto w-fit text-white/70"
        >
          Loading
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-3">{message}</h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 justify-center"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-primary-400"
            />
          ))}
        </motion.div>

        <p className="text-white/40 text-sm mt-6">
          Please wait a moment.
        </p>
      </motion.div>
    </motion.div>
  );
}

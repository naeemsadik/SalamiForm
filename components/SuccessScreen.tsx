"use client";

import { motion } from "framer-motion";
import { GradientButton } from "@/components/GradientButton";
import { SubmissionRecord } from "@/types";
import Lottie from "lottie-react";
import confettiAnimation from "@/lib/confetti.json";

interface SuccessScreenProps {
  submission: SubmissionRecord;
  onPlayAgain: () => void;
}

export function SuccessScreen({ submission, onPlayAgain }: SuccessScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Lottie
          animationData={confettiAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          🎉
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          Submission Received 😎
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-white/70 mb-8"
        >
          Your tribute to {submission.nickname} has been recorded! 💚
        </motion.p>

        {/* Show audio if uploaded */}
        {submission.audio_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-sm"
          >
            <p className="text-white/60 mb-4 text-sm">Your Eid Salam:</p>
            <audio
              controls
              src={submission.audio_url}
              className="w-full rounded-lg"
            />
          </motion.div>
        )}

        {/* Submission details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 rounded-2xl bg-white/5 border border-white/20 p-6 backdrop-blur-sm space-y-4 text-left"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-sm">For</p>
              <p className="text-white font-semibold">{submission.nickname}</p>
            </div>
            <div>
              <p className="text-white/40 text-sm">Relationship</p>
              <p className="text-white font-semibold capitalize">
                {submission.relationship}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-sm">Their Lang</p>
              <p className="text-white font-semibold capitalize">
                {submission.language_guess}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-sm">Your Eidi</p>
              <p className="text-white font-semibold">
                PKR {submission.eidi_amount.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <GradientButton onClick={onPlayAgain} className="text-lg px-10 py-4">
            Honor Another Elder →
          </GradientButton>
        </motion.div>

        {/* Floating emojis */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 text-4xl"
        >
          💚
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-4xl"
        >
          ✨
        </motion.div>
      </motion.div>
    </div>
  );
}

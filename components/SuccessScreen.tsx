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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-12 relative overflow-hidden">
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
        className="relative z-10 text-center max-w-2xl w-full"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl sm:text-4xl mb-4 sm:mb-6 text-white/80"
        >
          ঈদ মোবারক!
        </motion.div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300 bg-clip-text text-transparent">
          Submission Received
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-xl text-white/70 mb-6 sm:mb-8"
        >
          তোকে সালামি দেয়া যায় কিনা ভেবে দেখবো
        </motion.p>

        {/* Show audio if uploaded */}
        {submission.audio_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 sm:mb-8 rounded-2xl bg-white/10 border border-white/20 p-4 sm:p-6 backdrop-blur-sm"
          >
            <p className="text-white/60 mb-4 text-sm">Your voice recording:</p>
            <audio
              controls
              src={submission.audio_url}
              className="w-full rounded-lg"
            />
          </motion.div>
        )}

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 rounded-2xl bg-white/5 border border-white/20 p-6 backdrop-blur-sm space-y-4 text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-sm">Submission ID</p>
              <p className="text-white font-semibold">#{submission.id}</p>
            </div>
            <div>
              <p className="text-white/40 text-sm">Answers saved</p>
              <p className="text-white font-semibold">{submission.answer_count}</p>
            </div>
            <div>
              <p className="text-white/40 text-sm">Submitted at</p>
              <p className="text-white font-semibold">
                {new Date(submission.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {/* <GradientButton onClick={onPlayAgain} className="text-lg px-10 py-4">
            Submit Another Response
          </GradientButton> */}
        </motion.div>
      </motion.div>
    </div>
  );
}

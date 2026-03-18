"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingPage, FormEngine, SuccessScreen } from "@/components";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { supabase } from "@/lib/supabase";
import { FormSubmission, SubmissionRecord } from "@/types";

type AppState = "landing" | "form" | "success";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionRecord | null>(null);

  const handleStartForm = () => {
    setAppState("form");
  };

  const handleFormSubmit = async (data: FormSubmission) => {
    setIsSubmitting(true);
    try {
      // Keep a small delay so button state is visible on slower devices.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userSessionId = crypto.randomUUID();

      const { data: insertedSubmission, error: submissionError } = await supabase
        .from("submissions")
        .insert({
          user_session_id: userSessionId,
        })
        .select()
        .single();

      if (submissionError || !insertedSubmission) {
        console.error("Submit error:", submissionError);
        console.error("Inserted submission:", insertedSubmission);
        const errorMsg = submissionError?.message || "Failed to create submission. Please try again.";
        alert(errorMsg);
        return;
      }

      const answerRows = data.answers.map((item) => ({
        submission_id: insertedSubmission.id,
        question_id: item.questionId,
        answer: item.answer,
      }));

      if (answerRows.length > 0) {
        const { error: answerError } = await supabase
          .from("submission_answers")
          .insert(answerRows);

        if (answerError) {
          console.error("Answer save error:", answerError);
          alert("Something went wrong while saving answers. Please try again.");
          return;
        }
      }

      const uploadedAudioAnswer = data.answers.find((item) =>
        item.answer.startsWith("http")
      );

      const submissionRecord: SubmissionRecord = {
        id: insertedSubmission.id,
        created_at: insertedSubmission.created_at,
        answer_count: data.answers.length,
        audio_url: uploadedAudioAnswer?.answer,
      };

      setSubmission(submissionRecord);
      setAppState("success");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlayAgain = () => {
    setAppState("landing");
    setSubmission(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-primary-900 to-black overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onStart={handleStartForm} />
          </motion.div>
        )}

        {appState === "form" && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FormEngine onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
          </motion.div>
        )}

        {appState === "success" && submission && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SuccessScreen
              submission={submission}
              onPlayAgain={handlePlayAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSubmitting && <LoadingOverlay />}
      </AnimatePresence>
    </main>
  );
}

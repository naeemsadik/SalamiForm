"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingPage, FormEngine, SuccessScreen } from "@/components";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { supabase } from "@/lib/supabase";
import { FormData, SubmissionRecord } from "@/types";

type AppState = "landing" | "form" | "success";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionRecord | null>(null);

  const handleStartForm = () => {
    setAppState("form");
  };

  const handleFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate slight delay for dramatic effect 😎
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Insert into Supabase
      const { data: insertedData, error } = await supabase
        .from("submissions")
        .insert({
          name: data.name,
          relationship: data.relationship,
          reaction_when_seen: data.reaction_when_seen,
          first_interaction: data.first_interaction,
          text_reaction: data.text_reaction,
          language_guess: data.language_guess,
          nickname: data.nickname,
          eidi_amount: data.eidi_amount,
          reason: data.reason,
          audio_url: data.audio_url || null,
        })
        .select()
        .single();

      if (error) {
        console.error("Submit error:", error);
        alert("Something went wrong. Please try again. 😅");
        return;
      }

      const submissionRecord: SubmissionRecord = {
        id: insertedData.id,
        name: insertedData.name,
        relationship: insertedData.relationship,
        reaction_when_seen: insertedData.reaction_when_seen,
        first_interaction: insertedData.first_interaction,
        text_reaction: insertedData.text_reaction,
        language_guess: insertedData.language_guess,
        nickname: insertedData.nickname,
        eidi_amount: insertedData.eidi_amount,
        reason: insertedData.reason,
        audio_url: insertedData.audio_url,
        created_at: insertedData.created_at,
      };

      setSubmission(submissionRecord);
      setAppState("success");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Oops! Something went wrong. 😅");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlayAgain = () => {
    setAppState("landing");
    setSubmission(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black overflow-hidden">
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

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormSubmission, Question } from "@/types";
import { supabase } from "@/lib/supabase";
import { GlassCard, GradientButton, ProgressBar } from "@/components";
import {
  TextInputStep,
  MCQStep,
  TextareaStep,
  SliderStep,
  AudioUploadStep,
} from "@/components/forms";

interface FormEngineProps {
  onSubmit: (data: FormSubmission) => Promise<void>;
  isSubmitting?: boolean;
}

export function FormEngine({ onSubmit, isSubmitting = false }: FormEngineProps) {
    const hasEmoji = (value: string) => /[\p{Extended_Pictographic}]/u.test(value);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [validationError, setValidationError] = useState<string | undefined>();
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoadingQuestions(true);
      setQuestionsError(null);

      const { data, error } = await supabase
        .from("questions")
        .select("id, question_text, helper_text, question_type, options, order_index, is_active, created_at, updated_at")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) {
        setQuestionsError("Failed to load questions. Please refresh the page.");
        setIsLoadingQuestions(false);
        return;
      }

      setQuestions(data || []);
      setCurrentStepIndex(0);
      setIsLoadingQuestions(false);
    };

    loadQuestions();
  }, []);

  const currentStep = questions[currentStepIndex];
  const isLastStep = currentStepIndex === questions.length - 1;

  const isCurrentStepValid = useMemo(() => {
    if (!currentStep) return false;

    const currentValue = answers[currentStep.id];

    if (currentStep.question_type === "audio") {
      return true;
    }

    if (currentStep.question_type === "slider") {
      return typeof currentValue === "number";
    }

    return typeof currentValue === "string" && currentValue.trim().length > 0;
  }, [answers, currentStep]);

  const canProceed = useCallback(async () => {
    if (!currentStep) return false;

    if (
      (currentStep.question_type === "text" || currentStep.question_type === "textarea") &&
      typeof answers[currentStep.id] === "string" &&
      hasEmoji(String(answers[currentStep.id]))
    ) {
      setValidationError("Please remove emoji characters from your answer.");
      return false;
    }

    if (isCurrentStepValid) {
      setValidationError(undefined);
      return true;
    }

    setValidationError("Please complete this question before continuing.");
    return false;
  }, [currentStep, isCurrentStepValid]);

  const handleNext = async () => {
    if (await canProceed()) {
      if (currentStepIndex < questions.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (await canProceed()) {
      const finalData: FormSubmission = {
        answers: questions
          .map((question) => {
            const rawValue = answers[question.id];

            if (rawValue === undefined || rawValue === null) {
              return null;
            }

            const normalized = String(rawValue).trim();
            if (!normalized) {
              return null;
            }

            return {
              questionId: question.id,
              answer: normalized,
            };
          })
          .filter((item): item is { questionId: number; answer: string } => item !== null),
      };

      await onSubmit(finalData);
    }
  };

  const setAnswer = (questionId: number, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (validationError) {
      setValidationError(undefined);
    }
  };

  const renderStep = () => {
    if (!currentStep) return null;

    const stepValue = answers[currentStep.id];

    switch (currentStep.question_type) {
      case "text":
        return (
          <TextInputStep
            label={currentStep.question_text}
            helperText={currentStep.helper_text}
            placeholder="Write your answer"
            value={(stepValue as string) || ""}
            onChange={(val) => setAnswer(currentStep.id, val)}
            error={validationError}
          />
        );

      case "textarea":
        return (
          <TextareaStep
            label={currentStep.question_text}
            helperText={currentStep.helper_text}
            placeholder="Write your answer"
            value={(stepValue as string) || ""}
            onChange={(val) => setAnswer(currentStep.id, val)}
            error={validationError}
            maxLength={500}
          />
        );

      case "mcq": {
        const parsedOptions = Array.isArray(currentStep.options)
          ? currentStep.options
          : Array.isArray((currentStep.options as any)?.options)
            ? (currentStep.options as any).options
            : [];

        return (
          <MCQStep
            label={currentStep.question_text}
            helperText={currentStep.helper_text}
            options={parsedOptions}
            value={(stepValue as string) || ""}
            onChange={(val) => setAnswer(currentStep.id, val)}
            error={validationError}
          />
        );
      }

      case "slider":
        return (
          <SliderStep
            label={currentStep.question_text}
            helperText={currentStep.helper_text}
            value={typeof stepValue === "number" ? stepValue : 0}
            onChange={(val) => setAnswer(currentStep.id, val)}
            error={validationError}
            currencyCode="BDT"
          />
        );

      case "audio":
        return (
          <AudioUploadStep
            label={currentStep.question_text}
            helperText={currentStep.helper_text}
            onUpload={(url) => setAnswer(currentStep.id, url)}
            error={validationError}
          />
        );

      default:
        return null;
    }
  };

  if (isLoadingQuestions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <GlassCard className="p-8 md:p-10 text-center">
          <p className="text-white">Loading questions...</p>
        </GlassCard>
      </div>
    );
  }

  if (questionsError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <GlassCard className="p-8 md:p-10 text-center space-y-4">
          <p className="text-red-300">{questionsError}</p>
          <GradientButton onClick={() => window.location.reload()}>
            Retry
          </GradientButton>
        </GlassCard>
      </div>
    );
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <GlassCard className="p-8 md:p-10 text-center">
          <p className="text-white/80">No active questions are available right now.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <ProgressBar
        current={currentStepIndex + 1}
        total={questions.length}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex gap-4 justify-between"
          >
            <GradientButton
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className={`${currentStepIndex === 0 ? "invisible" : ""}`}
            >
              ← Back
            </GradientButton>

            <GradientButton
              onClick={isLastStep ? handleSubmit : handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : isLastStep ? "Submit" : "Next"}
            </GradientButton>
          </motion.div>

          {/* Step indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-white/40 text-sm"
          >
            Step {currentStepIndex + 1} of {questions.length}
          </motion.p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

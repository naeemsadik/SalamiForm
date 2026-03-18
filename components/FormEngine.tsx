"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { formSchema, FormData } from "@/types";
import { GlassCard, GradientButton, ProgressBar } from "@/components";
import {
  TextInputStep,
  MCQStep,
  TextareaStep,
  SliderStep,
  AudioUploadStep,
} from "@/components/forms";

const FORM_STEPS = [
  {
    id: "name",
    title: "Your Name",
    placeholder: "What's your name, bestie?",
  },
  {
    id: "relationship",
    title: "Your Relationship",
    options: [
      { label: "👵 Grandmother", value: "grandmother" },
      { label: "👴 Grandfather", value: "grandfather" },
      { label: "🧑‍🦳 Aged Parent", value: "parent" },
      { label: "👴 Uncle/Aunty", value: "uncle_aunty" },
    ],
  },
  {
    id: "reaction_when_seen",
    title: "When They Saw You on Eid",
    options: [
      { label: "😍 Pure Joy", value: "pure_joy", icon: "😍" },
      { label: "🤗 Warm Hug", value: "warm_hug", icon: "🤗" },
      { label: "😭 Got Emotional", value: "emotional", icon: "😭" },
      { label: "😂 Laughed at Me", value: "laughed", icon: "😂" },
    ],
  },
  {
    id: "first_interaction",
    title: "First Thing They Did",
    options: [
      { label: "💸 Gave Money", value: "gave_money", icon: "💸" },
      { label: "🍳 Made Food", value: "made_food", icon: "🍳" },
      { label: "🗣️ Started Talking", value: "started_talking", icon: "🗣️" },
      { label: "🤔 Asked About Exams", value: "asked_exams", icon: "🤔" },
    ],
  },
  {
    id: "text_reaction",
    title: "What They Said About You",
    placeholder: "How did they roast or praise you? 😂",
    dontgetTextarea: true,
  },
  {
    id: "language_guess",
    title: "Guess the Language",
    options: [
      { label: "🇵🇰 Urdu", value: "urdu" },
      { label: "🇵🇰 Punjabi", value: "punjabi" },
      { label: "🇵🇰 Pashto", value: "pashto" },
      { label: "🎭 English (The Classic)", value: "english" },
      { label: "🤷 Mix of Everything", value: "mix" },
    ],
  },
  {
    id: "nickname",
    title: "Their Nickname For You",
    placeholder: "What did they call you? (be honest 👀)",
  },
  {
    id: "eidi_amount",
    title: "Predict the Eidi Amount",
  },
  {
    id: "reason",
    title: "Why Do They Deserve Your Love?",
    placeholder: "Tell us why this elder is special 💚",
    isTextarea: true,
  },
  {
    id: "audio_url",
    title: "Drop Your Eid Salam 🎤",
  },
];

interface FormEngineProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function FormEngine({ onSubmit, isSubmitting = false }: FormEngineProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const {
    watch,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      eidi_amount: 0,
    },
  });

  const currentStep = FORM_STEPS[currentStepIndex];
  const values = watch();

  const canProceed = useCallback(async () => {
    const fieldName = currentStep.id as keyof FormData;
    return await trigger(fieldName);
  }, [trigger, currentStep.id]);

  const handleNext = async () => {
    if (await canProceed()) {
      if (currentStepIndex < FORM_STEPS.length - 1) {
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
      const finalData: FormData = {
        ...values,
        audio_url: audioUrl || undefined,
      };
      await onSubmit(finalData);
    }
  };

  const renderStep = () => {
    const stepValue = values[currentStep.id as keyof FormData];

    switch (currentStep.id) {
      case "name":
      case "nickname":
        return (
          <TextInputStep
            label={currentStep.title}
            placeholder={currentStep.placeholder || ""}
            value={(stepValue as string) || ""}
            onChange={(val) =>
              setValue(currentStep.id as keyof FormData, val as any)
            }
            error={
              errors[currentStep.id as keyof FormData]?.message as
                | string
                | undefined
            }
          />
        );

      case "text_reaction":
      case "reason":
        return (
          <TextareaStep
            label={currentStep.title}
            placeholder={currentStep.placeholder || ""}
            value={(stepValue as string) || ""}
            onChange={(val) =>
              setValue(currentStep.id as keyof FormData, val as any)
            }
            error={
              errors[currentStep.id as keyof FormData]?.message as
                | string
                | undefined
            }
            maxLength={
              currentStep.id === "text_reaction" ? 500 : 500
            }
          />
        );

      case "relationship":
      case "reaction_when_seen":
      case "first_interaction":
      case "language_guess":
        return (
          <MCQStep
            label={currentStep.title}
            options={(currentStep as any).options}
            value={(stepValue as string) || ""}
            onChange={(val) =>
              setValue(currentStep.id as keyof FormData, val as any)
            }
            error={
              errors[currentStep.id as keyof FormData]?.message as
                | string
                | undefined
            }
          />
        );

      case "eidi_amount":
        return (
          <SliderStep
            label={currentStep.title}
            value={(stepValue as number) || 0}
            onChange={(val) =>
              setValue(currentStep.id as keyof FormData, val as any)
            }
            error={
              errors[currentStep.id as keyof FormData]?.message as
                | string
                | undefined
            }
          />
        );

      case "audio_url":
        return (
          <AudioUploadStep
            label={currentStep.title}
            onUpload={(url) => {
              setAudioUrl(url);
              setValue("audio_url", url);
            }}
            error={
              errors[currentStep.id as keyof FormData]?.message as
                | string
                | undefined
            }
          />
        );

      default:
        return null;
    }
  };

  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <ProgressBar
        current={currentStepIndex + 1}
        total={FORM_STEPS.length}
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
              {isSubmitting
                ? "Submitting... ⏳"
                : isLastStep
                  ? "Submit 🎉"
                  : "Next →"}
            </GradientButton>
          </motion.div>

          {/* Step indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-white/40 text-sm"
          >
            Step {currentStepIndex + 1} of {FORM_STEPS.length}
          </motion.p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

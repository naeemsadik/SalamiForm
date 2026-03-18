import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  relationship: z.string().min(1, "You can't skip this. I'm watching 👀"),
  reaction_when_seen: z
    .string()
    .min(1, "You can't skip this. I'm watching 👀"),
  first_interaction: z
    .string()
    .min(1, "You can't skip this. I'm watching 👀"),
  text_reaction: z
    .string()
    .min(10, "Say something meaningful... even if it's chaotic 😂")
    .max(500, "Keep it under 500 characters"),
  language_guess: z
    .string()
    .min(1, "You can't skip this. I'm watching 👀"),
  nickname: z
    .string()
    .min(1, "Every Elder deserves a unique nickname ✨")
    .max(50, "Nickname too long bro"),
  eidi_amount: z
    .number()
    .min(0, "Can't go below 0")
    .max(100000, "Even Genie can't help here 🧞"),
  reason: z
    .string()
    .min(10, "Be honest about why they deserve it")
    .max(500, "Keep it under 500 characters"),
  audio_url: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export interface SubmissionRecord {
  id: string;
  name: string;
  relationship: string;
  reaction_when_seen: string;
  first_interaction: string;
  text_reaction: string;
  language_guess: string;
  nickname: string;
  eidi_amount: number;
  reason: string;
  audio_url?: string;
  created_at: string;
}

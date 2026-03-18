export interface FormAnswer {
  questionId: number;
  answer: string;
}

export interface FormSubmission {
  answers: FormAnswer[];
}

export interface SubmissionRecord {
  id: number;
  created_at: string;
  answer_count: number;
  audio_url?: string;
}

// New dynamic question types
export interface Question {
  id: number;
  question_text: string;
  helper_text?: string;
  question_type: "text" | "textarea" | "mcq" | "slider" | "audio";
  options?: Array<{ label: string; value: string }>;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: number;
  user_session_id: string;
  created_at: string;
  updated_at: string;
}

export interface SubmissionAnswer {
  id: number;
  submission_id: number;
  question_id: number;
  answer: string;
  created_at: string;
}

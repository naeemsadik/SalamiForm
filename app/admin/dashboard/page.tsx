"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";

interface Question {
  id: number;
  question_text: string;
  helper_text: string;
  question_type: string;
  options: any;
  order_index: number;
  is_active: boolean;
}

interface Answer {
  id: number;
  question_id: number;
  answer: string;
  questions: {
    question_text: string;
    question_type: string;
  };
}

interface Submission {
  id: number;
  created_at: string;
  answers: Answer[];
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"questions" | "submissions">(
    "questions"
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const router = useRouter();

  // Check auth and fetch data
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.push("/admin/login");
        return;
      }

      const { data: adminUser } = await supabase
        .from("admin_users")
        .select("is_admin")
        .eq("id", authUser.id)
        .single();

      if (!adminUser?.is_admin) {
        router.push("/admin/login");
        return;
      }

      setUser(authUser);
      await fetchData();
    };

    checkAuth();
  }, [router]);

  const getAuthHeaders = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token;

    if (!accessToken) {
      throw new Error("Session expired. Please login again.");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .order("order_index", { ascending: true });

      if (questionsError) throw questionsError;
      setQuestions(questionsData || []);

      // Fetch submissions
      const headers = await getAuthHeaders();
      const response = await fetch("/api/admin/submissions", { headers });
      if (!response.ok) throw new Error("Failed to fetch submissions");
      const submissionsData = await response.json();
      setSubmissions(submissionsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm("Are you sure? This will delete the question.")) return;

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/admin/questions/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) throw new Error("Failed to delete question");

      setQuestions(questions.filter((q) => q.id !== id));
      setSelectedQuestion(null);
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question");
    }
  };

  const handleToggleActive = async (question: Question) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/admin/questions/${question.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ is_active: !question.is_active }),
      });

      if (!response.ok) throw new Error("Failed to update question");

      const updated = await response.json();
      setQuestions(
        questions.map((q) => (q.id === question.id ? updated : q))
      );
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <GlassCard className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-400 border-t-accent-400 mx-auto mb-4" />
            <p className="text-white">Loading admin panel...</p>
          </div>
        </GlassCard>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Admin Control Center
            </h1>
            <p className="text-white/60 mt-1">
              Welcome, {user?.email}
            </p>
          </div>
          <GradientButton onClick={handleLogout} className="px-6">
            Logout
          </GradientButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <GlassCard className="p-4">
            <p className="text-white/60 text-sm">Total Submissions</p>
            <p className="text-3xl font-bold text-primary-400">
              {submissions.length}
            </p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-white/60 text-sm">Total Questions</p>
            <p className="text-3xl font-bold text-accent-400">
              {questions.length}
            </p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-white/60 text-sm">Active Questions</p>
            <p className="text-3xl font-bold text-secondary-400">
              {questions.filter((q) => q.is_active).length}
            </p>
          </GlassCard>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "questions"
                ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/50"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Questions ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "submissions"
                ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/50"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Submissions ({submissions.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "questions" && (
          <QuestionsTab
            questions={questions}
            selectedQuestion={selectedQuestion}
            onSelectQuestion={setSelectedQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onToggleActive={handleToggleActive}
            onRefresh={fetchData}
          />
        )}

        {activeTab === "submissions" && (
          <SubmissionsTab submissions={submissions} />
        )}
      </div>
    </div>
  );
}

function QuestionsTab({
  questions,
  selectedQuestion,
  onSelectQuestion,
  onDeleteQuestion,
  onToggleActive,
  onRefresh,
}: any) {
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Questions List */}
      <div className="lg:col-span-2">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">All Questions</h2>
            <GradientButton
              onClick={() => setShowNewForm(!showNewForm)}
              className="px-4 py-2 text-sm"
            >
              {showNewForm ? "Cancel" : "+ New"}
            </GradientButton>
          </div>

          {showNewForm && (
            <NewQuestionForm onSuccess={() => {
              setShowNewForm(false);
              onRefresh();
            }} />
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {questions.map((q: Question) => (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(q)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedQuestion?.id === q.id
                    ? "bg-primary-500/20 border border-primary-400/50"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">
                      Q{q.order_index}: {q.question_text}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {q.question_type.toUpperCase()}
                      {q.is_active ? "" : " (inactive)"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      q.is_active
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {q.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Question Details */}
      {selectedQuestion && (
        <div>
          <GlassCard className="p-6 sticky top-4">
            <h3 className="text-lg font-bold text-white mb-4">
              Question Details
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white/60">Question Text</p>
                <p className="text-white mt-1">{selectedQuestion.question_text}</p>
              </div>

              <div>
                <p className="text-white/60">Helper Text</p>
                <p className="text-white mt-1">
                  {selectedQuestion.helper_text || "None"}
                </p>
              </div>

              <div>
                <p className="text-white/60">Type</p>
                <p className="text-white mt-1 capitalize">
                  {selectedQuestion.question_type}
                </p>
              </div>

              <div>
                <p className="text-white/60">Order</p>
                <p className="text-white mt-1">#{selectedQuestion.order_index}</p>
              </div>

              {selectedQuestion.options && (
                <div>
                  <p className="text-white/60">Options</p>
                  <ul className="text-white mt-2 space-y-1">
                    {selectedQuestion.options.map(
                      (opt: any, idx: number) => (
                        <li key={idx} className="text-xs">
                          • {opt.label}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => onToggleActive(selectedQuestion)}
                  className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    selectedQuestion.is_active
                      ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30"
                      : "bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30"
                  }`}
                >
                  {selectedQuestion.is_active ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={() => onDeleteQuestion(selectedQuestion.id)}
                  className="w-full px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-all text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

function NewQuestionForm({ onSuccess }: any) {
  const [formData, setFormData] = useState({
    question_text: "",
    helper_text: "",
    question_type: "text",
    options: [],
    order_index: 1,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hasEmoji = (value: string) => /[\p{Extended_Pictographic}]/u.test(value);

      if (hasEmoji(formData.question_text) || hasEmoji(formData.helper_text)) {
        throw new Error("Please remove emoji characters from question text and helper text.");
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;
      if (!accessToken) {
        throw new Error("Session expired. Please login again.");
      }

      const response = await fetch("/api/admin/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create question");

      alert("Question created successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error creating question:", error);
      alert(error instanceof Error ? error.message : "Failed to create question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4 p-4 bg-white/5 rounded-lg">
      <input
        type="text"
        placeholder="Question text"
        value={formData.question_text}
        onChange={(e) =>
          setFormData({ ...formData, question_text: e.target.value })
        }
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 text-sm"
        required
      />

      <input
        type="text"
        placeholder="Helper text (optional)"
        value={formData.helper_text}
        onChange={(e) =>
          setFormData({ ...formData, helper_text: e.target.value })
        }
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 text-sm"
      />

      <select
        value={formData.question_type}
        onChange={(e) =>
          setFormData({ ...formData, question_type: e.target.value })
        }
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
      >
        <option value="text">Text Input</option>
        <option value="textarea">Text Area</option>
        <option value="mcq">Multiple Choice</option>
        <option value="slider">Slider</option>
        <option value="audio">Audio Upload</option>
      </select>

      <input
        type="number"
        placeholder="Order index"
        value={formData.order_index}
        onChange={(e) =>
          setFormData({ ...formData, order_index: parseInt(e.target.value) })
        }
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 text-sm"
        min="1"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded text-sm font-medium hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Question"}
      </button>
    </form>
  );
}

function SubmissionsTab({ submissions }: any) {
  const [expandedSubmission, setExpandedSubmission] = useState<number | null>(
    null
  );

  const isAudioUrl = (text: string) => text.startsWith("http");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {submissions.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <p className="text-white/60">No submissions yet</p>
        </GlassCard>
      ) : (
        submissions.map((submission: Submission) => (
          <GlassCard
            key={submission.id}
            className="p-4 cursor-pointer hover:bg-white/20 transition-all"
          >
            <button
              onClick={() =>
                setExpandedSubmission(
                  expandedSubmission === submission.id ? null : submission.id
                )
              }
              className="w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">
                    Submission #{submission.id}
                  </p>
                  <p className="text-white/60 text-sm">
                    {new Date(submission.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-white/60">
                  {expandedSubmission === submission.id ? "▼" : "▶"}
                </div>
              </div>
            </button>

            {expandedSubmission === submission.id && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                {submission.answers.map((answer: Answer) => (
                  <div key={answer.id} className="text-sm">
                    <p className="text-primary-300 font-medium">
                      {answer.questions.question_text}
                    </p>
                    
                    {isAudioUrl(answer.answer) ? (
                      <div className="mt-2 flex items-center gap-3">
                        <audio
                          src={answer.answer}
                          controls
                          className="flex-1 h-8"
                        />
                        <a
                          href={answer.answer}
                          download
                          className="px-3 py-1 rounded bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 text-xs font-medium transition-all"
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      <div className="mt-2 flex items-start gap-2">
                        <p className="text-white/70 flex-1 break-words bg-white/5 rounded px-3 py-2">
                          {answer.answer}
                        </p>
                        <button
                          onClick={() => copyToClipboard(answer.answer)}
                          className="px-3 py-2 rounded bg-accent-500/20 hover:bg-accent-500/30 text-accent-300 text-xs font-medium transition-all whitespace-nowrap"
                          title="Copy to clipboard"
                        >
                          Copy
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))
      )}
    </div>
  );
}

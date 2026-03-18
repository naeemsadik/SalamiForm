import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

async function getAuthenticatedUser(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  return user;
}

async function verifyAdmin(user: any) {
  if (!user) return false;

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return !error && adminUser?.is_admin;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!(await verifyAdmin(user))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get all submissions with their answers
    const { data: submissions, error: submissionsError } = await supabase
      .from("submissions")
      .select("id, created_at")
      .order("created_at", { ascending: false });

    if (submissionsError) throw submissionsError;

    // Get all answers for all submissions
    const submissionIds = submissions?.map((s) => s.id) || [];
    let allAnswers: any[] = [];

    if (submissionIds.length > 0) {
      const { data: answers, error: answersError } = await supabase
        .from("submission_answers")
        .select(
          "id, submission_id, question_id, answer, created_at, questions(question_text, question_type)"
        )
        .in("submission_id", submissionIds);

      if (answersError) throw answersError;
      allAnswers = answers || [];
    }

    // Merge submissions with their answers
    const submissionsWithAnswers = submissions?.map((submission) => ({
      ...submission,
      answers: allAnswers.filter((a) => a.submission_id === submission.id),
    }));

    return NextResponse.json(submissionsWithAnswers);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

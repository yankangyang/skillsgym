import { supabase } from "@/lib/supabase";

export const TEST_USER_ID = "00000000-0000-0000-0000-000000000001";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DiagnosticQuestion = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type DiagnosticResult = {
  user_id: string;
  answers: number[];
  scores: Record<string, number>;
  total_score: number;
};

export type DrillQuestion = {
  id: number;
  category: string;
  question?: string;
  prompt?: string;
  options?: string[];
  correct?: number;
  explanation?: string;
  difficulty?: string;
  approaches?: { label: string; description: string }[];
  steps?: { label: string; placeholder: string }[];
  dimensions?: string[];
  rubric?: string[];
  model_answer?: string;
  content?: string;
};

export type DrillSession = {
  user_id: string;
  category: string;
  questions_answered: number;
  correct_count: number;
  duration_seconds: number;
};

export type Story = {
  id: string;
  user_id: string;
  theme: string;
  status: "complete" | "empty";
  situation: string;
  task: string;
  action: string;
  result: string;
  firms: string[];
  created_at?: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  background: string;
  score: number;
  streak: number;
  trend: string;
  is_you?: boolean;
};

export type ChallengePrompt = {
  id: string;
  prompt_date: string;
  prompt: string;
  category: string;
  difficulty: string;
  closes_in?: string;
};

export type ChallengeSubmission = {
  id?: string;
  prompt_id: string;
  user_id: string;
  answer: string;
  score?: number;
  submitted_at?: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  background?: string;
  streak?: number;
};

// ─── Diagnostic ───────────────────────────────────────────────────────────────

export async function getDiagnosticQuestions(): Promise<DiagnosticQuestion[]> {
  const { data, error } = await supabase
    .from("diagnostic_questions")
    .select("*")
    .order("category");

  if (error) {
    console.error("getDiagnosticQuestions error:", error);
    return [];
  }
  return data ?? [];
}

export async function saveDiagnosticResult(result: DiagnosticResult): Promise<void> {
  const { error } = await supabase.from("diagnostic_results").insert([result]);
  if (error) {
    console.error("saveDiagnosticResult error:", error);
  }
}

export async function getLatestDiagnosticResult(
  userId: string
): Promise<DiagnosticResult | null> {
  const { data, error } = await supabase
    .from("diagnostic_results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getLatestDiagnosticResult error:", error);
    return null;
  }
  return data;
}

// ─── Drills ───────────────────────────────────────────────────────────────────

export async function getDrillQuestions(category: string): Promise<DrillQuestion[]> {
  const { data, error } = await supabase
    .from("drill_questions")
    .select("*")
    .eq("category", category)
    .order("id");

  if (error) {
    console.error("getDrillQuestions error:", error);
    return [];
  }
  return data ?? [];
}

export async function saveDrillSession(session: DrillSession): Promise<void> {
  const { error } = await supabase.from("drill_sessions").insert([session]);
  if (error) {
    console.error("saveDrillSession error:", error);
  }
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export async function getStories(userId: string): Promise<Story[]> {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getStories error:", error);
    return [];
  }
  return data ?? [];
}

export async function upsertStory(story: Partial<Story> & { id: string; user_id: string }): Promise<void> {
  const { error } = await supabase
    .from("stories")
    .upsert([story], { onConflict: "id" });

  if (error) {
    console.error("upsertStory error:", error);
  }
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("rank", { ascending: true });

  if (error) {
    console.error("getLeaderboard error:", error);
    return [];
  }
  return data ?? [];
}

// ─── Challenge ────────────────────────────────────────────────────────────────

export async function getTodaysChallenge(): Promise<ChallengePrompt | null> {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("challenge_prompts")
    .select("*")
    .eq("prompt_date", today)
    .maybeSingle();

  if (error) {
    console.error("getTodaysChallenge error:", error);
    return null;
  }
  return data;
}

export async function getTodaysChallengeSubmissions(
  promptId: string
): Promise<ChallengeSubmission[]> {
  const { data, error } = await supabase
    .from("challenge_submissions")
    .select("*")
    .eq("prompt_id", promptId)
    .order("score", { ascending: false })
    .limit(10);

  if (error) {
    console.error("getTodaysChallengeSubmissions error:", error);
    return [];
  }
  return data ?? [];
}

export async function saveChallengeSubmission(
  sub: Omit<ChallengeSubmission, "id" | "submitted_at">
): Promise<void> {
  const { error } = await supabase.from("challenge_submissions").insert([sub]);
  if (error) {
    console.error("saveChallengeSubmission error:", error);
  }
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getUser(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("getUser error:", error);
    return null;
  }
  return data;
}

export async function upsertUser(user: User): Promise<void> {
  const { error } = await supabase
    .from("users")
    .upsert([user], { onConflict: "id" });

  if (error) {
    console.error("upsertUser error:", error);
  }
}

export type VerticalKey = "consulting" | "mmi_medical" | "pe";

export type SubscriptionTier = "free" | "sprint" | "full_prep" | "monthly";

export interface DiagnosticScores {
  math?: number;
  structuring?: number;
  sizing?: number;
  behavioral?: number;
  [category: string]: number | undefined;
}

export interface UserProfile {
  id: string;
  email: string;
  vertical: VerticalKey;
  school?: string;
  cohortId?: string;
  targetFirms: string[];
  createdAt: string;
  subscription: {
    tier: SubscriptionTier;
    startedAt: string;
    expiresAt: string;
  };
  diagnosticResults?: {
    completedAt: string;
    scores: DiagnosticScores;
    readinessScore: number;
    priorityFix: string;
    retakeCount: number;
  };
  resumeScreen?: {
    completedAt: string;
    survivalEstimate: number;
    checks: Array<{
      id: string;
      status: "pass" | "fail";
      details: string;
    }>;
  };
}

export interface DrillQuestion {
  id: string;
  vertical: VerticalKey;
  category: string;
  subcategory: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  answer: string | null;
  hint: string | null;
  timeLimitSeconds: number;
  scoringType: "self_score" | "rule_based" | "llm_scored";
  scoringRubric: string | null;
  expertTake: {
    goodBuckets: string[];
    tip: string;
    sampleApproach: string;
  };
  tags: string[];
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  vertical: VerticalKey;
  school: string;
  category: string;
  score: number;
  rank: number;
  percentile: number;
  period: "all_time" | "weekly" | "monthly";
  updatedAt: string;
}


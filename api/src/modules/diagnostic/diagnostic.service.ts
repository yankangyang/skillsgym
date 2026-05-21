import type { DiagnosticScoreRequest } from "./diagnostic.schemas.js";

const phaseOneRoutes: Record<string, string> = {
  math: "mental-math",
  structuring: "structuring",
  sizing: "market-sizing",
  behavioral: "behavioral"
};

export function scoreDiagnostic({ vertical, scores }: DiagnosticScoreRequest) {
  const average = scores.reduce((sum, item) => sum + item.score, 0) / scores.length;
  const readinessScore = Math.round((average / 5) * 100);
  const priorityFix = [...scores].sort((a, b) => a.score - b.score)[0];

  return {
    vertical,
    readinessScore,
    priorityFix: priorityFix.category,
    recommendedTrack: phaseOneRoutes[priorityFix.category] ?? priorityFix.category,
    radar: scores,
    summary:
      readinessScore >= 75
        ? "Strong baseline. Focus on tightening your weakest category."
        : readinessScore >= 50
          ? "Mid-stage readiness. Daily drills should focus on the lowest-scoring dimension first."
          : "Early-stage readiness. Start with fundamentals before full case simulations."
  };
}

export function getDiagnosticCategories() {
  return [
    {
      id: "math",
      name: "Case Math",
      description: "Timed arithmetic, percentages, growth, and margin fluency."
    },
    {
      id: "structuring",
      name: "Structuring",
      description: "MECE thinking, prioritization, and case-specific frameworks."
    },
    {
      id: "sizing",
      name: "Market Sizing",
      description: "Decomposition, assumptions, and clean estimation logic."
    },
    {
      id: "behavioral",
      name: "Behavioral",
      description: "STAR discipline, signal strength, and PEI readiness."
    }
  ];
}


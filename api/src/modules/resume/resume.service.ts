import type { ResumeEvaluationRequest } from "./resume.schemas.js";

const actionVerbs = new Set([
  "led",
  "built",
  "launched",
  "created",
  "drove",
  "owned",
  "improved",
  "delivered",
  "negotiated",
  "implemented",
  "designed",
  "spearheaded",
  "increased",
  "reduced"
]);

const weakOpeners = [/^responsible for/i, /^worked on/i, /^helped/i, /^assisted/i];
const leadershipSignals = /\b(led|managed|mentored|captained|founded|launched|owned)\b/i;
const quantifiedSignal = /(\$|%|\b\d[\d,.]*\b)/;

export function evaluateResume({ text, targetFirms }: ResumeEvaluationRequest) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const bullets = lines.filter((line) => /^[-*•]/.test(line));
  const bulletBodies = bullets.map((line) => line.replace(/^[-*•]\s*/, ""));

  const quantifiedCount = bulletBodies.filter((line) => quantifiedSignal.test(line)).length;
  const passiveCount = bulletBodies.filter((line) =>
    weakOpeners.some((pattern) => pattern.test(line))
  ).length;
  const leadershipCount = bulletBodies.filter((line) => leadershipSignals.test(line)).length;
  const actionVerbCount = bulletBodies.filter((line) => {
    const firstWord = line.split(/\s+/)[0]?.toLowerCase() ?? "";
    return actionVerbs.has(firstWord);
  }).length;

  const bulletCount = bulletBodies.length;
  const quantifiedRatio = bulletCount ? quantifiedCount / bulletCount : 0;
  const actionVerbRatio = bulletCount ? actionVerbCount / bulletCount : 0;
  const leadershipRatio = bulletCount ? leadershipCount / bulletCount : 0;
  const passivePenalty = bulletCount ? passiveCount / bulletCount : 0;

  const survivalEstimate = Math.max(
    20,
    Math.min(
      95,
      Math.round(
        35 +
          quantifiedRatio * 25 +
          actionVerbRatio * 20 +
          leadershipRatio * 15 -
          passivePenalty * 20
      )
    )
  );

  const biggestRisk =
    leadershipRatio < 0.2
      ? "missing leadership signal"
      : quantifiedRatio < 0.5
        ? "too many unquantified bullets"
        : passivePenalty > 0.2
          ? "passive, low-ownership bullet language"
          : "firm-specific positioning is still generic";

  return {
    targetFirms,
    survivalEstimate,
    summary: `Estimated screen survival: ${survivalEstimate}%. Biggest risk: ${biggestRisk}.`,
    stats: {
      bulletCount,
      quantifiedCount,
      passiveCount,
      leadershipCount,
      actionVerbCount
    },
    checks: [
      {
        id: "bullet_count",
        status: bulletCount >= 6 ? "pass" : "fail",
        details: bulletCount >= 6 ? "Enough bullets to evaluate." : "Resume needs more accomplishment bullets."
      },
      {
        id: "quantified_impact",
        status: quantifiedRatio >= 0.5 ? "pass" : "fail",
        details:
          quantifiedRatio >= 0.5
            ? `${quantifiedCount} of ${bulletCount} bullets show measurable impact.`
            : `Only ${quantifiedCount} of ${bulletCount} bullets show measurable impact.`
      },
      {
        id: "action_verbs",
        status: actionVerbRatio >= 0.6 ? "pass" : "fail",
        details:
          actionVerbRatio >= 0.6
            ? "Most bullets open with strong action verbs."
            : "Too many bullets open weakly or without recruiter-friendly action verbs."
      },
      {
        id: "leadership_signal",
        status: leadershipRatio >= 0.2 ? "pass" : "fail",
        details:
          leadershipRatio >= 0.2
            ? "Leadership signal is present."
            : "Leadership signal is weak relative to MBB expectations."
      }
    ]
  };
}


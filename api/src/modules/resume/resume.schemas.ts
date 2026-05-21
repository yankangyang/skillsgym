import { z } from "zod";

export const resumeEvaluationRequestSchema = z.object({
  text: z.string().min(80, "Resume text should include enough content to analyze."),
  targetFirms: z.array(z.string()).default(["mckinsey", "bcg", "bain"])
});

export type ResumeEvaluationRequest = z.infer<typeof resumeEvaluationRequestSchema>;


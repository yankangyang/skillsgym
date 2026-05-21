import { z } from "zod";

export const diagnosticCategorySchema = z.object({
  category: z.string().min(1),
  score: z.number().min(1).max(5)
});

export const diagnosticScoreRequestSchema = z.object({
  vertical: z.enum(["consulting", "mmi_medical", "pe"]).default("consulting"),
  scores: z.array(diagnosticCategorySchema).min(1)
});

export type DiagnosticScoreRequest = z.infer<typeof diagnosticScoreRequestSchema>;


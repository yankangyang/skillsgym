import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import {
  resumeEvaluationRequestSchema
} from "./resume.schemas.js";
import { evaluateResume } from "./resume.service.js";

export async function registerResumeRoutes(app: FastifyInstance) {
  app.post("/resume-screen/evaluate", async (request, reply) => {
    try {
      const payload = resumeEvaluationRequestSchema.parse(request.body);
      return evaluateResume(payload);
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          message: "Invalid resume evaluation payload.",
          issues: error.issues
        });
      }

      throw error;
    }
  });
}


import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { diagnosticScoreRequestSchema } from "./diagnostic.schemas.js";
import {
  getDiagnosticCategories,
  scoreDiagnostic
} from "./diagnostic.service.js";

export async function registerDiagnosticRoutes(app: FastifyInstance) {
  app.get("/diagnostic/categories", async () => ({
    categories: getDiagnosticCategories()
  }));

  app.post("/diagnostic/score", async (request, reply) => {
    try {
      const payload = diagnosticScoreRequestSchema.parse(request.body);
      return scoreDiagnostic(payload);
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          message: "Invalid diagnostic scoring payload.",
          issues: error.issues
        });
      }

      throw error;
    }
  });
}


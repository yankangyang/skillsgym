import type { FastifyInstance } from "fastify";
import { registerDiagnosticRoutes } from "../modules/diagnostic/diagnostic.routes.js";
import { registerDrillRoutes } from "../modules/drills/drills.routes.js";
import { registerResumeRoutes } from "../modules/resume/resume.routes.js";

export async function registerApiRoutes(app: FastifyInstance) {
  app.register(async (api) => {
    api.get("/meta", async () => ({
      product: "Consulting Prep Gym",
      apiVersion: "v1",
      focus: ["resume_screen", "diagnostic", "drills"]
    }));

    await registerResumeRoutes(api);
    await registerDiagnosticRoutes(api);
    await registerDrillRoutes(api);
  }, { prefix: "/api/v1" });
}


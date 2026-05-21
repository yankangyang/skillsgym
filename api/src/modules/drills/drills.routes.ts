import type { FastifyInstance } from "fastify";
import { getDrillCatalog } from "./drills.service.js";

export async function registerDrillRoutes(app: FastifyInstance) {
  app.get("/drills/catalog", async () => getDrillCatalog());
}

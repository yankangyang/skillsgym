import cors from "@fastify/cors";
import Fastify from "fastify";
import { env } from "./config/env.js";
import { registerApiRoutes } from "./routes/index.js";

export async function buildServer() {
  const app = Fastify({
    logger: {
      transport:
        env.NODE_ENV === "development"
          ? {
              target: "pino-pretty",
              options: {
                translateTime: "SYS:standard",
                ignore: "pid,hostname"
              }
            }
          : undefined
    }
  });

  await app.register(cors, {
    origin: env.WEB_ORIGIN
  });

  app.get("/health", async () => ({
    ok: true,
    service: "skillsgym-backend",
    environment: env.NODE_ENV
  }));

  await registerApiRoutes(app);

  return app;
}


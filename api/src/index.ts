import { buildServer } from "./server.js";
import { env } from "./config/env.js";

const server = await buildServer();

try {
  await server.listen({
    port: env.PORT,
    host: env.HOST
  });

  server.log.info(`API ready on http://${env.HOST}:${env.PORT}`);
} catch (error) {
  server.log.error(error);
  process.exit(1);
}


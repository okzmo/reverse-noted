import { setupRoutes } from "./routes/index.ts";

Deno.serve((req) => setupRoutes(req));

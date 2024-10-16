import membersHandler from "./members/index.ts";
import createCardHandler from "./create-card/index.ts";
import { cors, corsHeaders } from "../lib/cors.ts";

export async function setupRoutes(req: Request) {
  const origin = req.headers.get("Origin") || "*";
  const pathname = new URL(req.url).pathname;
  const method = req.method;

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  let response: Response;
  const routeKey = `${method} ${pathname}`;

  switch (routeKey) {
    case "GET /members":
      response = await membersHandler(req);
      break;
    case "POST /create-card":
      response = await createCardHandler(req);
      break;
    default:
      response = new Response("Hello World!");
  }

  return cors(origin, response);
}

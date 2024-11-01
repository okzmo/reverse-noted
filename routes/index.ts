import createCardHandler from "./create-card/index.ts";
import { cors, corsHeaders } from "../lib/cors.ts";
import getCardsHandler from "./get-cards/index.ts";

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
    case "POST /create-card":
      response = await createCardHandler(req);
      break;
    case "POST /get-cards":
      response = await getCardsHandler(req);
      break;
    default:
      response = new Response("Hello World!");
  }

  return cors(origin, response);
}

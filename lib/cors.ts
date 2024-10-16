export function corsHeaders(origin: string): Headers {
  const headers = new Headers();
  const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

  if (allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  } else {
    headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
  }

  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, x-notion-key");
  return headers;
}

export function cors(origin: string, response: Response) {
  const corsResponse = new Response(response.body, response);
  corsHeaders(origin).forEach((value, key) =>
    corsResponse.headers.set(key, value),
  );

  return corsResponse;
}

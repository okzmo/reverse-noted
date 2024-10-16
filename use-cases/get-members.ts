import * as errors from "../lib/errors.ts";

export async function getMembers(notionKey: string) {
  const res = await fetch("https://api.notion.com/v1/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
      Authorization: `Bearer ${notionKey}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new errors.GetMembersError(500, "Failed to get members", {
      cause: data,
    });
  }

  return data;
}

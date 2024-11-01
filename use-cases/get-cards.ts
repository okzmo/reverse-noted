export async function getCards(
  notionKey: string,
  boardId: string,
) {
  const res = await fetch(`https://api.notion.com/v1/databases/${boardId}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
      Authorization: `Bearer ${notionKey}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
  }

  return data;
}

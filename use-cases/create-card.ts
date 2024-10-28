import * as errors from "../lib/errors.ts";
import type { CardData } from "../utils/parse-data.ts";

export async function createCard(
  notionKey: string,
  cardData: CardData,
  imageUrl: string,
) {
  const { card_title, card_description, boardId } = cardData;
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
      Authorization: `Bearer ${notionKey}`,
    },
    body: JSON.stringify({
      parent: {
        type: "database_id",
        database_id: boardId,
      },
      properties: {
        Name: {
          title: [{ text: { content: card_title } }],
        },
        Status: {
          select: {
            name: "Not started",
          },
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: card_description,
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "image",
          image: {
            type: "external",
            external: {
              url: imageUrl,
            },
          },
        },
      ],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    throw new errors.CreateCardError(500, "Failed to create card", {
      cause: data,
    });
  }

  return data;
}

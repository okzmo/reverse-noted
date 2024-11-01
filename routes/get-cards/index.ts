import * as errors from "../../lib/errors.ts";
import "jsr:@std/dotenv/load";
import { getCards } from "../../use-cases/get-cards.ts";

export default async function getCardsHandler(req: Request) {
  try {
    const notionKey = req.headers.get("x-notion-key");
    if (!notionKey) {
      throw new errors.MissingKeyError(404, "Missing notion integration key");
    }

    const body = await req.json();

    const res = await getCards(notionKey, body.boardId);

    const notionCards = res.results.map((card) => ({
      title: card.properties.Name.title[0]?.text.content || '',
      author: card.properties.Author.rich_text[0]?.text.content || '',
      status: {
        name: card.properties.Status.select?.name || '',
        color: card.properties.Status.select?.color || '',
      } 
    }))


    return new Response(JSON.stringify(notionCards), { status: 200 });
  } catch (err) {
    if (err instanceof errors.MissingKeyError) {
      return err.toResponse();
    }

    if (err instanceof errors.CreateCardError) {
      return err.toResponse();
    }

    return errors.DEFAULT_ERROR;
  }
}

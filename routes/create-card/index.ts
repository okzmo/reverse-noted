import * as errors from "../../lib/errors.ts";
import { createCard } from "../../use-cases/create-card.ts";
import { processAndUploadImage } from "../../use-cases/process-image.ts";
import "jsr:@std/dotenv/load";
import { parseCardData } from "../../utils/parse-data.ts";

export default async function createCardHandler(req: Request) {
  try {
    const notionKey = req.headers.get("x-notion-key");
    if (!notionKey) {
      throw new errors.MissingKeyError(404, "Missing notion integration key");
    }

    const formData = await req.formData();
    const cardData = parseCardData(formData);

    const imageUrl = await processAndUploadImage(cardData);
    const res = await createCard(notionKey, cardData, imageUrl);

    return new Response(JSON.stringify(res), { status: 200 });
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

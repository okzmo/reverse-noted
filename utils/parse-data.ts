import * as errors from "../lib/errors.ts";

export interface CardData {
  card_title: string;
  card_description: string;
  selectionCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  boardId: string;
  name: string;
  location: string;
  viewportHeight: number;
  viewportWidth: number;
}

export function parseCardData(formData: FormData) {
  const card_title = formData.get("card_title");
  const card_description = formData.get("card_description");
  const selectionCoords = formData.get("selectionCoords");
  const boardId = formData.get("boardId");
  const name = formData.get("name");
  const location = formData.get("location");
  const viewportHeight = formData.get("viewportHeight");
  const viewportWidth = formData.get("viewportWidth");

  if (
    !card_title ||
    !card_description ||
    !selectionCoords ||
    !boardId ||
    !name ||
    !location ||
    !viewportHeight ||
    !viewportWidth
  ) {
    throw new errors.MissingDataError(404, "Missing required data");
  }

  const cardData: CardData = {
    card_title: card_title as string,
    card_description: card_description as string,
    selectionCoords: JSON.parse(selectionCoords as string),
    boardId: boardId as string,
    name: name as string,
    location: location as string,
    viewportHeight: Number(viewportHeight),
    viewportWidth: Number(viewportWidth),
  };

  return cardData;
}

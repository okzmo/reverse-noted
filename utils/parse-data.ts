import * as errors from "../lib/errors.ts";

export interface CardData {
  image: string;
  dpr: number;
  card_title: string;
  card_description: string;
  selectionCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  assignees: any[];
  boardId: string;
}

export function parseCardData(formData: FormData) {
  const image = formData.get("image");
  const dpr = formData.get("dpr");
  const card_title = formData.get("card_title");
  const card_description = formData.get("card_description");
  const selectionCoords = formData.get("selectionCoords");
  const assignees = formData.get("assignees");
  const boardId = formData.get("boardId");

  if (
    !image ||
    !dpr ||
    !card_title ||
    !card_description ||
    !selectionCoords ||
    !assignees ||
    !boardId
  ) {
    throw new errors.MissingDataError(404, "Missing required data");
  }

  const cardData: CardData = {
    image: image as string,
    dpr: Number(dpr),
    card_title: card_title as string,
    card_description: card_description as string,
    selectionCoords: JSON.parse(selectionCoords as string),
    assignees: JSON.parse(assignees as string),
    boardId: boardId as string,
  };

  return cardData;
}

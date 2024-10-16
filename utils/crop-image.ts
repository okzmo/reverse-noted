import { createCanvas, loadImage } from "https://deno.land/x/canvas/mod.ts";

interface Props {
  image: string;
  dpr: number;
  selectionCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
export const cropImage = async ({ image, dpr, selectionCoords }: Props) => {
  const img = await loadImage(image);

  const canvas = createCanvas(
    Math.round(selectionCoords.width * dpr * 1.5),
    Math.round(selectionCoords.height * dpr * 1.5),
  );
  const ctx = canvas.getContext("2d");

  const x = Math.round(selectionCoords.x * dpr * 1.5);
  const y = Math.round(selectionCoords.y * dpr * 1.5);
  const width = Math.round(selectionCoords.width * dpr * 1.5);
  const height = Math.round(selectionCoords.height * dpr * 1.5);

  ctx.drawImage(img, x, y, width, height, 0, 0, width, height); // Debug: Log canvas dimensions

  const buffer = canvas.toBuffer("image/png");

  return buffer;
};

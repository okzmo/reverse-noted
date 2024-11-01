import "jsr:@std/dotenv/load";
import { randomId } from "../utils/random-id.ts";
import { createS3Client } from "../lib/s3.ts";
import { cropImage } from "../utils/crop-image.ts";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { CardData } from "../utils/parse-data.ts";

const S3_BUCKET_NAME = Deno.env.get("S3_BUCKET_NAME")!;

export async function processAndUploadImage(cardData: CardData) {
  const { selectionCoords, location, viewportWidth, viewportHeight } = cardData;
  const s3 = createS3Client();
  const fileName = `${randomId()}.png`;
  const croppedImage = await cropImage({
    selectionCoords: selectionCoords,
    url: location,
    viewportWidth: viewportWidth,
    viewportHeight: viewportHeight,
  });

  s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: croppedImage,
      ContentType: "image/png",
    }),
  );

  const imageUrl = `https://f003.backblazeb2.com/file/${S3_BUCKET_NAME}/${fileName}`;

  return imageUrl;
}

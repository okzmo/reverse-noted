import { S3Client } from "@aws-sdk/client-s3";
import "jsr:@std/dotenv/load";

const S3_URL = Deno.env.get("S3_URL")!;
const S3_REGION = Deno.env.get("S3_REGION")!;
const S3_ID = Deno.env.get("S3_ID")!;
const S3_SECRET = Deno.env.get("S3_SECRET")!;

export function createS3Client() {
  return new S3Client({
    endpoint: S3_URL,
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ID,
      secretAccessKey: S3_SECRET,
    },
  });
}

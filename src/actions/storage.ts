"use server";

import * as Minio from "minio";

const BUCKET_NAME = "fenice";
const minioClient = new Minio.Client({
  endPoint: "s3.soulsbros.ch",
  useSSL: true,
  accessKey: process.env.S3_ACCESS_KEY!,
  secretKey: process.env.S3_SECRET_KEY!,
});

// Gets an URL to the given document, or empty string on error
export async function getSignedURL(document: string) {
  let presignedUrl = "";
  try {
    presignedUrl = await minioClient.presignedUrl(
      "GET",
      BUCKET_NAME,
      document,
      24 * 60 * 60
    );
  } catch (error) {
    console.error(
      `Error getting URL for ${document} from bucket ${BUCKET_NAME}`
    );
  }

  return presignedUrl;
}

// Returns the list of file names in a given path
export async function getFiles(path: string) {
  return new Promise<string[]>((resolve, reject) => {
    const stream = minioClient.listObjects(BUCKET_NAME, path, true);
    const docs: string[] = [];

    stream.on("data", function (obj) {
      docs.push(obj.name ?? "Unknown name");
    });

    stream.on("end", function () {
      resolve(docs);
    });

    stream.on("error", function (err) {
      console.error(`Error reading files from bucket: ${err}`);
      reject(err);
    });
  });
}

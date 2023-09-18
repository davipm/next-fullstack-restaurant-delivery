import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

import methods from "@/classes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  if (!path) {
    return methods.sendError(400, "Image path is required");
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [
        { width: 1000, crop: "scale", quality: 35, fetch_format: "auto" },
      ],
    };

    const result = await cloudinary.uploader.upload(path, options);
    return methods.sendSuccess(result);
  } catch (error) {
    return methods.sendInternalServerError();
  }
}

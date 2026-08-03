import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (buffer, originalName) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary credentials are not configured.");
  }

  return new Promise((resolve, reject) => {
    const publicId = `${Date.now()}-${originalName.split(".")[0].replace(/[^a-zA-Z0-9-_]/g, "-") || "property"}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "homescape",
        public_id: publicId,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export default cloudinary;

import { uploadToCloudinary } from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select an image to upload." });
    }

    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);

    return res.status(201).json({
      message: "Image uploaded successfully",
      url: result.secure_url,
      filename: result.public_id,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Image upload failed. Please try again.",
    });
  }
};

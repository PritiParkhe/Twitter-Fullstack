import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "stories", // Folder name in Cloudinary
    format: async (req, file) => "jpeg", // Supports promises as well
    public_id: (req, file) => `${file.originalname}-${Date.now()}`,
  },
});

const upload = multer({ storage });

export default upload;

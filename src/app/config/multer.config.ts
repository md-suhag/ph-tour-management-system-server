import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const originalName = file.originalname.toLowerCase().trim();

      const baseName = originalName.replace(/\.[^/.]+$/, "");

      const safeBaseName = baseName
        .replace(/\s+/g, "-")
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-z0-9\-]/g, "");

      // Final unique filename
      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        safeBaseName;

      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });

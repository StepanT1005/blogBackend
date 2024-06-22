import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const uploadPath = "uploads";

try {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
} catch (err) {
  console.error("Failed to create directory", err);
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadPath);
  },
  filename: (_, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = uuidv4() + fileExt;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });

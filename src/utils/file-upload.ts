import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

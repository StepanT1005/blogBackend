import { Request, Response, NextFunction } from "express";

export const validateFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Check the file type
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimeType = fileTypes.test(req.file.mimetype);

  if (!mimeType) {
    return res.status(400).json({ message: "Only image files are allowed!" });
  }

  // Check the file size (e.g., 5MB max)
  const maxSize = 5 * 1024 * 1024; // 5 MB
  if (req.file.size > maxSize) {
    return res
      .status(400)
      .json({ message: "File size should be less than 5MB" });
  }

  next();
};

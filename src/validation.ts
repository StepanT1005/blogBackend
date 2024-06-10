import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  body("fullName", "Enter a valid name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar URL").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Enter the title of the article")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Enter the text of the article")
    .isLength({ min: 10 })
    .isString(),
  body("tags", "Incorrect format for tags").optional().isString(),
  body("imageUrl", "Invalid image URL").optional().isString(),
];

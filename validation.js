import { body } from "express-validator";

export const authValidation = [
  body("email", "Неправильний формат пошти").isEmail(),
  body("password", " Пароль повинен містити мінімум 5 символів").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Неправильний формат пошти").isEmail(),
  body("password", " Пароль повинен містити мінімум 5 символів").isLength({
    min: 5,
  }),
  body("fullName", `Вкажіть коректне ім'я`).isLength({ min: 3 }),
  body("avatarUrl", "Неправильна ссилка на аватар").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введіть заголовок статті").isLength({ min: 3 }).isString(),
  body("text", " Введіть текст статті").isLength({ min: 10 }).isString(),
  body("tags", "Неправильний формат тегів").optional().isString(),
  body("imageUrl", "Невірна ссилка на зображення").optional().isString(),
];

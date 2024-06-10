import express, { Request, Response } from "express";
import { registerValidation, loginValidation } from "../validation";
import handleValidationErrors from "../middleware/handleValidationErrors";
import UserController from "../controllers/user.controller";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  (req: Request, res: Response) => UserController.login(req, res)
);
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
router.get("/me", checkAuth, UserController.getMe);

export default router;

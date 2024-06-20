import { Request, Response } from "express";
import userService from "../services/user.service";
import { UserData } from "../types";

class UserController {
  static async register(
    req: Request<{}, {}, UserData>,
    res: Response
  ): Promise<void> {
    try {
      const avatarUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      const userData = await userService.register({ ...req.body, avatarUrl });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to register",
      });
    }
  }

  static async login(
    req: Request<{}, {}, UserData>,
    res: Response
  ): Promise<void> {
    try {
      const userData = await userService.login(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "Incorrect login or password",
      });
    }
  }

  static async getMe(
    req: Request<{}, {}, { userId: string }>,
    res: Response
  ): Promise<void> {
    if (!req.body.userId) {
      res.status(401).json({
        message: "Unauthorized access - no user id found",
      });
      return;
    }
    try {
      const userData = await userService.getUserDetails(req.body.userId);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: "User not found",
      });
    }
  }
}

export default UserController;

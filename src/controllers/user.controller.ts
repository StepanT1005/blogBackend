import { Request, Response } from "express";
import userService from "../services/user.service";

interface CustomRequest extends Request {
  userId?: string;
}
class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = await userService.register(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to register",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const userData = await userService.login(
        req.body.email,
        req.body.password
      );
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "Incorrect login or password",
      });
    }
  }

  static async getMe(req: CustomRequest, res: Response): Promise<void> {
    if (!req.userId) {
      res.status(401).json({
        message: "Unauthorized access - no user id found",
      });
      return;
    }
    try {
      const userData = await userService.getUserDetails(req.userId);
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

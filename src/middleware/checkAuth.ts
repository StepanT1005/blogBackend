import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  _id: string;
}
interface CustomRequest extends Request {
  userId?: string;
}
const checkAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): any => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secretkey"
      ) as JwtPayload;

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access",
    });
  }
};

export default checkAuth;

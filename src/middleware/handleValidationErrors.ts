import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
  }

  next();
};

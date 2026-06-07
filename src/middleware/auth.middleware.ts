import { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../services/auth/jwt.service";
import { DbUser } from "../repositories/user.repository";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);

    console.log(decoded);
    const { id, ...rest } = decoded as DbUser;
    (req as any).user = { ...rest, userId: id };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

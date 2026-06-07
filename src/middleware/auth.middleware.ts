import { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../services/auth/jwt.service";

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
    (req as any).user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

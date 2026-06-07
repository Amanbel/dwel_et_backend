import { Request, Response } from "express";
import { findUserById, publicUser } from "../repositories/user.repository";

export const me = async (req: Request, res: Response) => {
  const user = await findUserById((req as any).user.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    status: "connected user",
    ok: true,
    user: publicUser(user),
  });
};

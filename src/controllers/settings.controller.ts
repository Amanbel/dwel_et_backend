import { Request, Response } from "express";

export const getSettings = async (_req: Request, res: Response) => {
  res.json({
    notifications: true,
    weeklyReports: true,
    privacyMode: true,
  });
};

export const updateSettings = async (req: Request, res: Response) => {
  res.json(req.body);
};

import { Request, Response } from "express";
import { processContent } from "../services/ingestion/contentIngestion.service";

export const ingestContent = async (req: Request, res: Response) => {
  try {
    const result = await processContent({
      ...req.body,
      user: (req as any).user,
      userId: req.body.userId || (req as any).user?.userId,
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Processing failed",
      detail: error.message,
    });
  }
};

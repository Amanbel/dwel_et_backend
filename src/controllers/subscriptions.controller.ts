import { Request, Response } from "express";
import { createCheckoutSession } from "../services/subscriptions/billing.service";
import { getCurrentSubscription, getPlans, upgradeSubscription } from "../services/subscriptions/subscription.service";

export const plans = async (_req: Request, res: Response) => {
  res.json(getPlans());
};

export const current = async (req: Request, res: Response) => {
  const subscription = await getCurrentSubscription((req as any).user.userId);
  res.json({
    ...subscription,
    plan: subscription.plan === "free" ? "sub_base" : subscription.plan,
  });
};

export const checkout = async (req: Request, res: Response) => {
  const provider = req.body.provider === "chapa" ? "chapa" : "stripe";
  res.json(await createCheckoutSession((req as any).user.userId, req.body.planId, provider));
};

export const upgrade = async (req: Request, res: Response) => {
  try {
    res.json(await upgradeSubscription((req as any).user.userId, req.body.planId, req.body.provider));
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

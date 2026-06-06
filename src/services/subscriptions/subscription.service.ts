import { getSubscriptionByUserId, upsertSubscription } from "../../repositories/subscription.repository";

export const plans = [
  {
    id: "sub_base",
    name: "Base Explorer",
    price: "$0",
    period: "forever",
    description: "Essential tools for individual awareness and daily tracking.",
    features: ["Daily Wellness Reports", "7-Day Historical Data Access", "Basic Focus Metrics"],
    isPopular: false,
    buttonText: "Current Plan",
  },
  {
    id: "sub_pro",
    name: "Lab Professional",
    price: "$24",
    period: "month",
    description: "Deep analytics, full reports, and unlimited longitudinal data access.",
    features: ["Weekly & Monthly Meta-Reports", "Unlimited History", "Advanced Insights", "PDF Exports"],
    isPopular: true,
    buttonText: "Upgrade to Professional",
  },
  {
    id: "sub_premium",
    name: "Premium Lab",
    price: "$49",
    period: "month",
    description: "Long-term tracking, advanced recommendations, and export workflows.",
    features: ["Long-Term Tracking", "Advanced Recommendations", "Priority Report Exports", "Team-Ready Data"],
    isPopular: false,
    buttonText: "Upgrade to Premium",
  },
];

export const getPlans = () => plans;

export const getCurrentSubscription = async (userId: string) => {
  const subscription = await getSubscriptionByUserId(userId);
  return subscription || { user_id: userId, plan: "free", status: "active" };
};

export const upgradeSubscription = async (userId: string, planId: string, provider = "manual") => {
  if (!plans.some((plan) => plan.id === planId)) throw new Error("Unknown plan");
  return upsertSubscription(userId, planId, provider);
};

export const ensureFeatureAccess = async (userId: string, feature: "full_history" | "monthly_reports" | "pdf_export") => {
  const subscription = await getCurrentSubscription(userId);
  const plan = subscription.plan || "sub_base";
  const allowed =
    plan === "sub_premium" ||
    (plan === "sub_pro" && ["full_history", "monthly_reports", "pdf_export"].includes(feature)) ||
    (plan === "sub_base" && feature === "full_history");

  if (!allowed) {
    const error: any = new Error("Upgrade required");
    error.status = 402;
    throw error;
  }
};

export const createCheckoutSession = async (userId: string, planId: string, provider: "stripe" | "chapa" = "stripe") => {
  return {
    provider,
    planId,
    userId,
    checkoutUrl: `${process.env.APP_URL || "http://localhost:5173"}/subscription?checkout=mock&plan=${planId}`,
  };
};

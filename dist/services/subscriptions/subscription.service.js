"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFeatureAccess = exports.upgradeSubscription = exports.getCurrentSubscription = exports.getPlans = exports.plans = void 0;
const subscription_repository_1 = require("../../repositories/subscription.repository");
exports.plans = [
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
const getPlans = () => exports.plans;
exports.getPlans = getPlans;
const getCurrentSubscription = async (userId) => {
    const subscription = await (0, subscription_repository_1.getSubscriptionByUserId)(userId);
    return subscription || { user_id: userId, plan: "free", status: "active" };
};
exports.getCurrentSubscription = getCurrentSubscription;
const upgradeSubscription = async (userId, planId, provider = "manual") => {
    if (!exports.plans.some((plan) => plan.id === planId))
        throw new Error("Unknown plan");
    return (0, subscription_repository_1.upsertSubscription)(userId, planId, provider);
};
exports.upgradeSubscription = upgradeSubscription;
const ensureFeatureAccess = async (userId, feature) => {
    const subscription = await (0, exports.getCurrentSubscription)(userId);
    const plan = subscription.plan || "sub_base";
    const allowed = plan === "sub_premium" ||
        (plan === "sub_pro" && ["full_history", "monthly_reports", "pdf_export"].includes(feature)) ||
        (plan === "sub_base" && feature === "full_history");
    if (!allowed) {
        const error = new Error("Upgrade required");
        error.status = 402;
        throw error;
    }
};
exports.ensureFeatureAccess = ensureFeatureAccess;
//# sourceMappingURL=subscription.service.js.map
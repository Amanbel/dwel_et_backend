"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgrade = exports.checkout = exports.current = exports.plans = void 0;
const billing_service_1 = require("../services/subscriptions/billing.service");
const subscription_service_1 = require("../services/subscriptions/subscription.service");
const plans = async (_req, res) => {
    res.json((0, subscription_service_1.getPlans)());
};
exports.plans = plans;
const current = async (req, res) => {
    const subscription = await (0, subscription_service_1.getCurrentSubscription)(req.user.userId);
    res.json({
        ...subscription,
        plan: subscription.plan === "free" ? "sub_base" : subscription.plan,
    });
};
exports.current = current;
const checkout = async (req, res) => {
    const provider = req.body.provider === "chapa" ? "chapa" : "stripe";
    res.json(await (0, billing_service_1.createCheckoutSession)(req.user.userId, req.body.planId, provider));
};
exports.checkout = checkout;
const upgrade = async (req, res) => {
    try {
        res.json(await (0, subscription_service_1.upgradeSubscription)(req.user.userId, req.body.planId, req.body.provider));
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.upgrade = upgrade;
//# sourceMappingURL=subscriptions.controller.js.map
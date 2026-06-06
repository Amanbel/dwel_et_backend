"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const createCheckoutSession = async (userId, planId, provider = "stripe") => {
    return {
        provider,
        planId,
        userId,
        checkoutUrl: `${process.env.APP_URL || "http://localhost:5173"}/subscription?checkout=mock&plan=${planId}`,
    };
};
exports.createCheckoutSession = createCheckoutSession;
//# sourceMappingURL=billing.service.js.map
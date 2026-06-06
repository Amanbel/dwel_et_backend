"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertSubscription = exports.getSubscriptionByUserId = void 0;
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../config/database");
const getSubscriptionByUserId = async (userId) => {
    const rows = await (0, database_1.query)("SELECT * FROM subscriptions WHERE user_id = ? LIMIT 1", [userId]);
    return rows[0] || null;
};
exports.getSubscriptionByUserId = getSubscriptionByUserId;
const upsertSubscription = async (userId, plan, provider) => {
    const existing = await (0, exports.getSubscriptionByUserId)(userId);
    if (existing) {
        await (0, database_1.query)("UPDATE subscriptions SET plan = ?, status = 'active', provider = COALESCE(?, provider) WHERE user_id = ?", [plan, provider || null, userId]);
    }
    else {
        await (0, database_1.query)("INSERT INTO subscriptions (id, user_id, plan, status, provider) VALUES (?, ?, ?, 'active', ?)", [crypto_1.default.randomUUID(), userId, plan, provider || null]);
    }
    return (0, exports.getSubscriptionByUserId)(userId);
};
exports.upsertSubscription = upsertSubscription;
//# sourceMappingURL=subscription.repository.js.map
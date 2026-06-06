"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findContentEvents = exports.findContentEventById = exports.createContentEvent = void 0;
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../config/database");
const createContentEvent = async (input) => {
    const id = crypto_1.default.randomUUID();
    await (0, database_1.query)(`INSERT INTO content_events
      (id, user_id, platform, url, title, description, hashtags, duration_seconds, topics, emotions, sentiment, risk_level, wellbeing_score, confidence)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        id,
        input.userId,
        input.platform || "unknown",
        input.url || null,
        input.title || null,
        input.description || null,
        JSON.stringify(input.hashtags || []),
        Math.max(0, Number(input.durationSeconds || 0)),
        JSON.stringify(input.topics || []),
        JSON.stringify(input.emotions || []),
        input.sentiment || "neutral",
        input.riskLevel || "low",
        input.wellbeingScore,
        input.confidence || 0,
    ]);
    return (0, exports.findContentEventById)(id);
};
exports.createContentEvent = createContentEvent;
const findContentEventById = async (id) => {
    const rows = await (0, database_1.query)("SELECT * FROM content_events WHERE id = ? LIMIT 1", [id]);
    return rows[0] || null;
};
exports.findContentEventById = findContentEventById;
const findContentEvents = async (userId, days = 30) => {
    return (0, database_1.query)("SELECT * FROM content_events WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) ORDER BY created_at DESC", [userId, days]);
};
exports.findContentEvents = findContentEvents;
//# sourceMappingURL=content.repository.js.map
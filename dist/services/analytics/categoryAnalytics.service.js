"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryExposure = void 0;
const content_repository_1 = require("../../repositories/content.repository");
const colors = ["#006a61", "#6a1edb", "#004ac6", "#ba1a1a", "#8a5a00", "#31511e"];
const getCategoryExposure = async (userId) => {
    const events = await (0, content_repository_1.findContentEvents)(userId, 30);
    const totals = new Map();
    let totalSeconds = 0;
    for (const event of events) {
        const topics = parseJsonArray(event.topics);
        const duration = Number(event.duration_seconds || 0);
        totalSeconds += duration;
        for (const topic of topics.length ? topics : ["uncategorized"]) {
            const current = totals.get(topic) || { seconds: 0, score: 0, count: 0 };
            current.seconds += duration;
            current.score += Number(event.wellbeing_score || 0);
            current.count += 1;
            totals.set(topic, current);
        }
    }
    return Array.from(totals.entries()).map(([category, value], index) => ({
        category,
        time: formatDuration(value.seconds),
        percentage: totalSeconds ? Math.round((value.seconds / totalSeconds) * 100) : 0,
        impact: value.count ? Number((value.score / value.count).toFixed(1)) : 0,
        trend: "flat",
        color: colors[index % colors.length],
    }));
};
exports.getCategoryExposure = getCategoryExposure;
const parseJsonArray = (value) => {
    if (Array.isArray(value))
        return value;
    try {
        return JSON.parse(value || "[]");
    }
    catch {
        return [];
    }
};
const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);
    return h ? `${h}h ${m}m` : `${m}m`;
};
//# sourceMappingURL=categoryAnalytics.service.js.map
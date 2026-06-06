"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const content_repository_1 = require("../../repositories/content.repository");
const getDashboardData = async (userId) => {
    const events = await (0, content_repository_1.findContentEvents)(userId, 30);
    const totalScore = events.reduce((sum, e) => sum + Number(e.wellbeing_score), 0);
    const wellbeingScore = events.length ? totalScore / events.length : 0;
    const positiveEvents = events.filter((e) => e.sentiment === "positive").length;
    const screenSeconds = events.reduce((sum, e) => sum + Number(e.duration_seconds || 0), 0);
    return {
        wellbeingScore: Math.round(wellbeingScore),
        overallScore: Math.round(wellbeingScore),
        totalEvents: events.length,
        screenTime: formatDuration(screenSeconds),
        socialMediaTime: formatDuration(screenSeconds),
        positiveContentPercentage: events.length ? Math.round((positiveEvents / events.length) * 100) : 0,
    };
};
exports.getDashboardData = getDashboardData;
const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);
    return h ? `${h}h ${m}m` : `${m}m`;
};
//# sourceMappingURL=dashboard.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = exports.insights = exports.appImpacts = exports.emotionalTrends = exports.categories = exports.dashboard = void 0;
const dashboard_service_1 = require("../services/analytics/dashboard.service");
const categoryAnalytics_service_1 = require("../services/analytics/categoryAnalytics.service");
const emotionAnalytics_service_1 = require("../services/analytics/emotionAnalytics.service");
const usageAnalytics_service_1 = require("../services/analytics/usageAnalytics.service");
const content_repository_1 = require("../repositories/content.repository");
const dashboard = async (req, res) => {
    const userId = req.user.userId;
    const data = await (0, dashboard_service_1.getDashboardData)(userId);
    res.json(data);
};
exports.dashboard = dashboard;
const categories = async (req, res) => {
    res.json(await (0, categoryAnalytics_service_1.getCategoryExposure)(req.user.userId));
};
exports.categories = categories;
const emotionalTrends = async (req, res) => {
    res.json(await (0, emotionAnalytics_service_1.getEmotionTrends)(req.user.userId));
};
exports.emotionalTrends = emotionalTrends;
const appImpacts = async (req, res) => {
    res.json(await (0, usageAnalytics_service_1.getAppImpacts)(req.user.userId));
};
exports.appImpacts = appImpacts;
const insights = async (req, res) => {
    res.json(await (0, usageAnalytics_service_1.getInsights)(req.user.userId));
};
exports.insights = insights;
const sessions = async (req, res) => {
    const userId = req.user.userId;
    const days = req.query.dateRange === "Last 30 Days" || req.query.dateRange === "This Month" ? 30 : 7;
    let events = await (0, content_repository_1.findContentEvents)(userId, days);
    const application = req.query.application?.toString();
    const category = req.query.category?.toString();
    const sentiment = req.query.sentiment?.toString();
    if (application && application !== "All Apps") {
        events = events.filter((event) => event.platform?.toLowerCase() === application.toLowerCase());
    }
    if (category && category !== "All Categories") {
        events = events.filter((event) => parseJsonArray(event.topics).some((topic) => topic.toLowerCase() === category.toLowerCase()));
    }
    const mapped = events.map(mapSession);
    res.json(sentiment && sentiment !== "Any Sentiment"
        ? mapped.filter((session) => session.sentiment === sentiment)
        : mapped);
};
exports.sessions = sessions;
const mapSession = (event) => {
    const topics = parseJsonArray(event.topics);
    const sentiment = normalizeSentiment(event.sentiment, Number(event.wellbeing_score || 0));
    return {
        id: event.id,
        timestamp: new Date(event.created_at).toISOString(),
        appName: event.platform || "Unknown",
        icon: platformIcon(event.platform),
        iconColor: sentiment === "Negative" ? "text-error" : sentiment === "Positive" ? "text-tertiary" : "text-primary",
        context: event.title || event.description || event.url || "Tracked social content session",
        category: topics[0] || "Uncategorized",
        sentiment,
        impactScore: Math.round(Number(event.wellbeing_score || 0)),
    };
};
const normalizeSentiment = (sentiment, score) => {
    if (score >= 80)
        return "Deep Work";
    if (sentiment === "positive")
        return "Positive";
    if (sentiment === "negative")
        return "Negative";
    return "Neutral";
};
const platformIcon = (platform) => {
    const value = platform?.toLowerCase();
    if (value === "youtube")
        return "play_circle";
    if (value === "instagram")
        return "photo_camera";
    if (value === "reddit")
        return "forum";
    if (value === "tiktok")
        return "music_note";
    return "public";
};
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
//# sourceMappingURL=analytics.controller.js.map
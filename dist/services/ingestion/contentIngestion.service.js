"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processContent = void 0;
const geminiClassifier_service_1 = require("../classification/geminiClassifier.service");
const impactEngine_service_1 = require("../impact/impactEngine.service");
const content_repository_1 = require("../../repositories/content.repository");
const processContent = async (payload) => {
    const content = `
Title: ${payload.title}

Description: ${payload.description}
`;
    const classification = await (0, geminiClassifier_service_1.classifyContent)(content);
    const impact = (0, impactEngine_service_1.calculateImpact)(classification);
    const userId = payload.userId || payload.user?.userId;
    const event = userId
        ? await (0, content_repository_1.createContentEvent)({
            userId,
            platform: payload.platform,
            url: payload.url,
            title: payload.title,
            description: payload.description,
            hashtags: payload.hashtags,
            durationSeconds: payload.duration || payload.durationSeconds,
            topics: classification.topics || [],
            emotions: classification.emotions || [],
            sentiment: classification.sentiment || "neutral",
            riskLevel: classification.riskLevel || "low",
            wellbeingScore: impact.wellbeingScore,
            confidence: classification.confidence || 0,
        })
        : null;
    return {
        event,
        classification,
        impact,
    };
};
exports.processContent = processContent;
//# sourceMappingURL=contentIngestion.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateImpact = void 0;
const calculateImpact = (classification) => {
    let score = 0;
    const topicWeights = {
        education: 3,
        finance: 2,
        fitness: 3,
        technology: 2,
        entertainment: 1,
        violence: -4,
    };
    const emotionWeights = {
        motivation: 3,
        inspiration: 3,
        positivity: 2,
        anxiety: -4,
        stress: -3,
    };
    classification.topics?.forEach((topic) => {
        score += topicWeights[topic] || 0;
    });
    classification.emotions?.forEach((emotion) => {
        score += emotionWeights[emotion] || 0;
    });
    const sentiment = classification.sentiment;
    if (sentiment === "positive")
        score += 8;
    if (sentiment === "negative")
        score -= 8;
    if (classification.riskLevel === "high")
        score -= 15;
    if (classification.riskLevel === "medium")
        score -= 6;
    return {
        wellbeingScore: Math.max(0, Math.min(100, 50 + score)),
    };
};
exports.calculateImpact = calculateImpact;
//# sourceMappingURL=impactEngine.service.js.map
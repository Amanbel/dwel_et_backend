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
    return {
        wellbeingScore: score,
    };
};
exports.calculateImpact = calculateImpact;
//# sourceMappingURL=impactEngine.service.js.map
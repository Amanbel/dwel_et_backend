"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyContent = classifyContent;
const axios_1 = __importDefault(require("axios"));
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
async function classifyContent(content) {
    const prompt = `
You are a content classification engine.

Analyze this social media content:

${content}

Return ONLY valid JSON.

{
  "topics": [],
  "emotions": [],
  "sentiment": "",
  "riskLevel": "",
  "wellbeingImpact": "",
  "confidence": 0
}
`;
    const response = await axios_1.default.post(OPENROUTER_URL, {
        model: process.env.OPENROUTER_MODEL,
        messages: [
            {
                role: "system",
                content: "You are a JSON content classifier.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.1,
    }, {
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
    });
    const raw = response.data.choices[0].message.content;
    return JSON.parse(raw);
}
//# sourceMappingURL=geminiClassifier.service.js.map
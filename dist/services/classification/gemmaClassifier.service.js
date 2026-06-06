"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyContent = void 0;
const OLLAMA_URL = "http://localhost:11434/api/generate";
const classifyContent = async (title, description) => {
    const prompt = `
Classify this content.

Title:
${title}

Description:
${description}

Return JSON:

{
 "topics": [],
 "emotions": [],
 "sentiment": "",
 "riskLevel": ""
}
`;
    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gemma3",
            prompt,
            stream: false,
        }),
    });
    const data = await response.json();
    return JSON.parse(data.response);
};
exports.classifyContent = classifyContent;
//# sourceMappingURL=gemmaClassifier.service.js.map
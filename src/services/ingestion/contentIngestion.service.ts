import { classifyContent } from "../classification/geminiClassifier.service";
import { calculateImpact } from "../impact/impactEngine.service";
import { createContentEvent } from "../../repositories/content.repository";

export const processContent = async (payload: any) => {
  const content = `
Title: ${payload.title}

Description: ${payload.description}
`;
  const classification = await classifyContent(content);

  const impact = calculateImpact(classification);

  const userId = payload.userId || payload.user?.userId;
  const event = userId
    ? await createContentEvent({
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

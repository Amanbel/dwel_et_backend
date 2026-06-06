import axios from "axios";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function classifyContent(content: string) {
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

  const response = await axios.post(
    OPENROUTER_URL,
    {
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
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const raw = response.data.choices[0].message.content;

  return JSON.parse(raw);
}

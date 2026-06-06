import crypto from "crypto";
import { query } from "../config/database";

export type ContentEventInput = {
  userId: string;
  platform: string;
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  durationSeconds?: number;
  topics: string[];
  emotions: string[];
  sentiment: string;
  riskLevel: string;
  wellbeingScore: number;
  confidence?: number;
};

export const createContentEvent = async (input: ContentEventInput) => {
  const id = crypto.randomUUID();
  await query(
    `INSERT INTO content_events
      (id, user_id, platform, url, title, description, hashtags, duration_seconds, topics, emotions, sentiment, risk_level, wellbeing_score, confidence)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.userId,
      input.platform || "unknown",
      input.url || null,
      input.title || null,
      input.description || null,
      JSON.stringify(input.hashtags || []),
      Math.max(0, Number(input.durationSeconds || 0)),
      JSON.stringify(input.topics || []),
      JSON.stringify(input.emotions || []),
      input.sentiment || "neutral",
      input.riskLevel || "low",
      input.wellbeingScore,
      input.confidence || 0,
    ],
  );
  return findContentEventById(id);
};

export const findContentEventById = async (id: string) => {
  const rows = await query<any[]>("SELECT * FROM content_events WHERE id = ? LIMIT 1", [id]);
  return rows[0] || null;
};

export const findContentEvents = async (userId: string, days = 30) => {
  return query<any[]>(
    "SELECT * FROM content_events WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) ORDER BY created_at DESC",
    [userId, days],
  );
};

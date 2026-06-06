import { Request, Response } from "express";

import { getDashboardData } from "../services/analytics/dashboard.service";
import { getCategoryExposure } from "../services/analytics/categoryAnalytics.service";
import { getEmotionTrends } from "../services/analytics/emotionAnalytics.service";
import { getAppImpacts, getInsights } from "../services/analytics/usageAnalytics.service";
import { findContentEvents } from "../repositories/content.repository";

export const dashboard = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const data = await getDashboardData(userId);

  res.json(data);
};

export const categories = async (req: Request, res: Response) => {
  res.json(await getCategoryExposure((req as any).user.userId));
};

export const emotionalTrends = async (req: Request, res: Response) => {
  res.json(await getEmotionTrends((req as any).user.userId));
};

export const appImpacts = async (req: Request, res: Response) => {
  res.json(await getAppImpacts((req as any).user.userId));
};

export const insights = async (req: Request, res: Response) => {
  res.json(await getInsights((req as any).user.userId));
};

export const sessions = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const days = req.query.dateRange === "Last 30 Days" || req.query.dateRange === "This Month" ? 30 : 7;
  let events = await findContentEvents(userId, days);

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

  res.json(
    sentiment && sentiment !== "Any Sentiment"
      ? mapped.filter((session) => session.sentiment === sentiment)
      : mapped,
  );
};

const mapSession = (event: any) => {
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

const normalizeSentiment = (sentiment: string, score: number) => {
  if (score >= 80) return "Deep Work";
  if (sentiment === "positive") return "Positive";
  if (sentiment === "negative") return "Negative";
  return "Neutral";
};

const platformIcon = (platform: string) => {
  const value = platform?.toLowerCase();
  if (value === "youtube") return "play_circle";
  if (value === "instagram") return "photo_camera";
  if (value === "reddit") return "forum";
  if (value === "tiktok") return "music_note";
  return "public";
};

const parseJsonArray = (value: any): string[] => {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value || "[]");
  } catch {
    return [];
  }
};

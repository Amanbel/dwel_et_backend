import { findContentEvents } from "../../repositories/content.repository";
import { createReport } from "../../repositories/report.repository";

export const generateDailyReport = async (userId: string) => {
  return generateReport(userId, "daily", 1, "Daily Wellness Report");
};

export const generateReport = async (userId: string, type: "daily" | "weekly" | "monthly", days: number, title: string) => {
  const events = await findContentEvents(userId, days);
  const score = averageScore(events);
  const negative = percent(events, (event) => event.sentiment === "negative");
  const positive = percent(events, (event) => event.sentiment === "positive");
  const calm = percent(events, (event) => parseJsonArray(event.emotions).some((e) => ["calm", "motivation", "positivity"].includes(e)));
  const stress = percent(events, (event) => parseJsonArray(event.emotions).some((e) => ["stress", "anxiety", "anger"].includes(e)));

  return createReport({
    userId,
    type,
    title,
    dateRange: `${days} day${days === 1 ? "" : "s"}`,
    summary:
      events.length === 0
        ? "No content events were recorded for this period."
        : `DWEL analyzed ${events.length} content events. The average wellbeing score was ${Math.round(score)}.`,
    score,
    deepWorkHours: Number((events.filter((event) => Number(event.wellbeing_score) >= 65).reduce((sum, event) => sum + Number(event.duration_seconds || 0), 0) / 3600).toFixed(1)),
    fatigueRisk: negative >= 35 ? "High" : negative >= 18 ? "Medium" : "Low",
    focusPercentage: positive,
    disruptionPercentage: negative,
    calmPercentage: calm,
    stressPercentage: stress,
    neutralPercentage: Math.max(0, 100 - calm - stress),
    recommendations: buildRecommendations(score, negative, stress),
  });
};

const averageScore = (events: any[]) =>
  events.length ? Number((events.reduce((sum, event) => sum + Number(event.wellbeing_score || 0), 0) / events.length).toFixed(1)) : 0;

const percent = (events: any[], predicate: (event: any) => boolean) =>
  events.length ? Math.round((events.filter(predicate).length / events.length) * 100) : 0;

const parseJsonArray = (value: any): string[] => {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value || "[]");
  } catch {
    return [];
  }
};

const buildRecommendations = (score: number, negative: number, stress: number) => [
  {
    id: "rec_balance",
    title: score >= 65 ? "Keep the Positive Mix" : "Rebalance Your Feed",
    description: score >= 65 ? "Your recent content mix is supportive. Keep prioritizing educational and motivating sources." : "Add intentional educational, fitness, or creative content to offset draining sessions.",
  },
  {
    id: "rec_breaks",
    title: negative > 25 || stress > 25 ? "Add Recovery Breaks" : "Protect Your Calm Windows",
    description: negative > 25 || stress > 25 ? "Schedule short pauses after stressful or negative sessions to reduce carryover effects." : "Your stressful exposure is controlled; keep late-night scrolling limited.",
  },
];

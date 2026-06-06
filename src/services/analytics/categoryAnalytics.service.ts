import { findContentEvents } from "../../repositories/content.repository";

const colors = ["#006a61", "#6a1edb", "#004ac6", "#ba1a1a", "#8a5a00", "#31511e"];

export const getCategoryExposure = async (userId: string) => {
  const events = await findContentEvents(userId, 30);
  const totals = new Map<string, { seconds: number; score: number; count: number }>();
  let totalSeconds = 0;

  for (const event of events) {
    const topics = parseJsonArray(event.topics);
    const duration = Number(event.duration_seconds || 0);
    totalSeconds += duration;
    for (const topic of topics.length ? topics : ["uncategorized"]) {
      const current = totals.get(topic) || { seconds: 0, score: 0, count: 0 };
      current.seconds += duration;
      current.score += Number(event.wellbeing_score || 0);
      current.count += 1;
      totals.set(topic, current);
    }
  }

  return Array.from(totals.entries()).map(([category, value], index) => ({
    category,
    time: formatDuration(value.seconds),
    percentage: totalSeconds ? Math.round((value.seconds / totalSeconds) * 100) : 0,
    impact: value.count ? Number((value.score / value.count).toFixed(1)) : 0,
    trend: "flat",
    color: colors[index % colors.length],
  }));
};

const parseJsonArray = (value: any): string[] => {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value || "[]");
  } catch {
    return [];
  }
};

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m}m`;
};

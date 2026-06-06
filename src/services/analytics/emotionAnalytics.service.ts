import { findContentEvents } from "../../repositories/content.repository";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getEmotionTrends = async (userId: string) => {
  const events = await findContentEvents(userId, 7);
  const days = new Map<string, { stress: number; calm: number; total: number }>();

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.set(dayNames[date.getDay()], { stress: 0, calm: 0, total: 0 });
  }

  for (const event of events) {
    const label = dayNames[new Date(event.created_at).getDay()];
    const bucket = days.get(label);
    if (!bucket) continue;
    const emotions = parseJsonArray(event.emotions);
    bucket.total += 1;
    if (emotions.some((e) => ["stress", "anxiety", "anger", "sadness"].includes(e))) bucket.stress += 1;
    if (emotions.some((e) => ["calm", "motivation", "inspiration", "positivity"].includes(e))) bucket.calm += 1;
  }

  return Array.from(days.entries()).map(([day, value]) => ({
    day,
    stress: value.total ? Math.round((value.stress / value.total) * 100) : 0,
    calm: value.total ? Math.round((value.calm / value.total) * 100) : 0,
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

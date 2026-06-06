import { findContentEvents } from "../../repositories/content.repository";

const platformIcon: Record<string, string> = {
  youtube: "play_circle",
  tiktok: "music_note",
  instagram: "photo_camera",
  reddit: "forum",
  twitter: "public",
  x: "public",
  facebook: "thumb_up",
};

export const getAppImpacts = async (userId: string) => {
  const events = await findContentEvents(userId, 30);
  const totals = new Map<string, { seconds: number; score: number; count: number; category: string }>();

  for (const event of events) {
    const platform = event.platform || "unknown";
    const current = totals.get(platform) || { seconds: 0, score: 0, count: 0, category: "Social" };
    current.seconds += Number(event.duration_seconds || 0);
    current.score += Number(event.wellbeing_score || 0);
    current.count += 1;
    current.category = parseJsonArray(event.topics)[0] || "Social";
    totals.set(platform, current);
  }

  return Array.from(totals.entries()).map(([appName, value]) => {
    const average = value.count ? value.score / value.count : 0;
    return {
      id: appName,
      appName,
      icon: platformIcon[appName.toLowerCase()] || "public",
      category: value.category,
      time: formatDuration(value.seconds),
      impact: average > 60 ? "positive" : average < 40 ? "negative" : "neutral",
      focusLabel: average > 60 ? "Supportive" : average < 40 ? "High Drain" : "Mixed",
      color: average > 60 ? "#006a61" : average < 40 ? "#ba1a1a" : "#004ac6",
    };
  });
};

export const getInsights = async (userId: string) => {
  const events = await findContentEvents(userId, 7);
  const average = events.length
    ? events.reduce((sum, event) => sum + Number(event.wellbeing_score || 0), 0) / events.length
    : 0;

  return [
    {
      id: "ins_score",
      type: average >= 60 ? "optimal" : "warning",
      title: average >= 60 ? "Positive Content Balance" : "Wellbeing Score Needs Attention",
      description:
        average >= 60
          ? "Recent consumption is trending toward supportive or educational content."
          : "Recent sessions include more draining content. Consider breaks and intentional topic choices.",
    },
    {
      id: "ins_volume",
      type: "info",
      title: "Tracking Coverage",
      description: `${events.length} content events were analyzed in the last 7 days.`,
    },
  ];
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

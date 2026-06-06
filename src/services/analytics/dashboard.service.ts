import { findContentEvents } from "../../repositories/content.repository";

export const getDashboardData = async (userId: string) => {
  const events = await findContentEvents(userId, 30);

  const totalScore = events.reduce(
    (sum: number, e: any) => sum + Number(e.wellbeing_score),
    0,
  );

  const wellbeingScore = events.length ? totalScore / events.length : 0;
  const positiveEvents = events.filter((e: any) => e.sentiment === "positive").length;
  const screenSeconds = events.reduce((sum: number, e: any) => sum + Number(e.duration_seconds || 0), 0);

  return {
    wellbeingScore: Math.round(wellbeingScore),
    overallScore: Math.round(wellbeingScore),
    totalEvents: events.length,
    screenTime: formatDuration(screenSeconds),
    socialMediaTime: formatDuration(screenSeconds),
    positiveContentPercentage: events.length ? Math.round((positiveEvents / events.length) * 100) : 0,
  };
};

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m}m`;
};

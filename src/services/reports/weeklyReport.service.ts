import { generateReport } from "./dailyReport.service";

export const generateWeeklyReport = async (userId: string) => {
  return generateReport(userId, "weekly", 7, "Weekly Wellness Report");
};

import { generateReport } from "./dailyReport.service";

export const generateMonthlyReport = async (userId: string) => {
  return generateReport(userId, "monthly", 30, "Monthly Wellness Report");
};

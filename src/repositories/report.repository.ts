import crypto from "crypto";
import { query } from "../config/database";

export const listReports = async (userId: string, type?: string) => {
  const params = type ? [userId, type] : [userId];
  const where = type ? "WHERE user_id = ? AND type = ?" : "WHERE user_id = ?";
  return query<any[]>(`SELECT * FROM reports ${where} ORDER BY created_at DESC`, params);
};

export const getReport = async (userId: string, id: string) => {
  const rows = await query<any[]>("SELECT * FROM reports WHERE user_id = ? AND id = ? LIMIT 1", [userId, id]);
  return rows[0] || null;
};

export const createReport = async (report: any) => {
  const id = crypto.randomUUID();
  await query(
    `INSERT INTO reports
      (id, user_id, type, title, date_range, summary, score, deep_work_hours, fatigue_risk, focus_percentage,
       disruption_percentage, calm_percentage, stress_percentage, neutral_percentage, recommendations)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      report.userId,
      report.type,
      report.title,
      report.dateRange,
      report.summary,
      report.score,
      report.deepWorkHours,
      report.fatigueRisk,
      report.focusPercentage,
      report.disruptionPercentage,
      report.calmPercentage,
      report.stressPercentage,
      report.neutralPercentage,
      JSON.stringify(report.recommendations || []),
    ],
  );
  return getReport(report.userId, id);
};

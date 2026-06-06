import { Request, Response } from "express";
import { getReport, listReports } from "../repositories/report.repository";
import { generateDailyReport } from "../services/reports/dailyReport.service";
import { generateWeeklyReport } from "../services/reports/weeklyReport.service";
import { generateMonthlyReport } from "../services/reports/monthlyReport.service";
import { createPdfExportPlaceholder } from "../services/reports/pdfReport.service";
import { ensureFeatureAccess } from "../services/subscriptions/subscription.service";

export const index = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const type = req.query.type?.toString();
  res.json((await listReports(userId, type)).map(mapReport));
};

export const show = async (req: Request, res: Response) => {
  const report = await getReport((req as any).user.userId, String(req.params.id));
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json(mapReport(report));
};

export const generate = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const type = (req.body.type || req.query.type || "daily").toString();
  if (type === "monthly") await ensureFeatureAccess(userId, "monthly_reports");

  const report =
    type === "monthly"
      ? await generateMonthlyReport(userId)
      : type === "weekly"
        ? await generateWeeklyReport(userId)
        : await generateDailyReport(userId);

  res.status(201).json(mapReport(report));
};

export const exportPdf = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  await ensureFeatureAccess(userId, "pdf_export");
  const report = await getReport(userId, String(req.params.id));
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json(await createPdfExportPlaceholder(report));
};

const mapReport = (row: any) => ({
  id: row.id,
  type: row.type,
  title: row.title,
  dateRange: row.date_range,
  summary: row.summary,
  score: Number(row.score),
  deepWorkHours: Number(row.deep_work_hours),
  fatigueRisk: row.fatigue_risk,
  focusPercentage: Number(row.focus_percentage),
  disruptionPercentage: Number(row.disruption_percentage),
  calmPercentage: Number(row.calm_percentage),
  stressPercentage: Number(row.stress_percentage),
  neutralPercentage: Number(row.neutral_percentage),
  recommendations: parseJson(row.recommendations),
});

const parseJson = (value: any) => {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value || "[]");
  } catch {
    return [];
  }
};

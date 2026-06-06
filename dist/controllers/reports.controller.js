"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportPdf = exports.generate = exports.show = exports.index = void 0;
const report_repository_1 = require("../repositories/report.repository");
const dailyReport_service_1 = require("../services/reports/dailyReport.service");
const weeklyReport_service_1 = require("../services/reports/weeklyReport.service");
const monthlyReport_service_1 = require("../services/reports/monthlyReport.service");
const pdfReport_service_1 = require("../services/reports/pdfReport.service");
const subscription_service_1 = require("../services/subscriptions/subscription.service");
const index = async (req, res) => {
    const userId = req.user.userId;
    const type = req.query.type?.toString();
    res.json((await (0, report_repository_1.listReports)(userId, type)).map(mapReport));
};
exports.index = index;
const show = async (req, res) => {
    const report = await (0, report_repository_1.getReport)(req.user.userId, String(req.params.id));
    if (!report)
        return res.status(404).json({ message: "Report not found" });
    res.json(mapReport(report));
};
exports.show = show;
const generate = async (req, res) => {
    const userId = req.user.userId;
    const type = (req.body.type || req.query.type || "daily").toString();
    if (type === "monthly")
        await (0, subscription_service_1.ensureFeatureAccess)(userId, "monthly_reports");
    const report = type === "monthly"
        ? await (0, monthlyReport_service_1.generateMonthlyReport)(userId)
        : type === "weekly"
            ? await (0, weeklyReport_service_1.generateWeeklyReport)(userId)
            : await (0, dailyReport_service_1.generateDailyReport)(userId);
    res.status(201).json(mapReport(report));
};
exports.generate = generate;
const exportPdf = async (req, res) => {
    const userId = req.user.userId;
    await (0, subscription_service_1.ensureFeatureAccess)(userId, "pdf_export");
    const report = await (0, report_repository_1.getReport)(userId, String(req.params.id));
    if (!report)
        return res.status(404).json({ message: "Report not found" });
    res.json(await (0, pdfReport_service_1.createPdfExportPlaceholder)(report));
};
exports.exportPdf = exportPdf;
const mapReport = (row) => ({
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
const parseJson = (value) => {
    if (Array.isArray(value))
        return value;
    try {
        return JSON.parse(value || "[]");
    }
    catch {
        return [];
    }
};
//# sourceMappingURL=reports.controller.js.map
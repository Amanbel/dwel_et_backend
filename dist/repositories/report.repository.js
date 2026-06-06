"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReport = exports.getReport = exports.listReports = void 0;
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../config/database");
const listReports = async (userId, type) => {
    const params = type ? [userId, type] : [userId];
    const where = type ? "WHERE user_id = ? AND type = ?" : "WHERE user_id = ?";
    return (0, database_1.query)(`SELECT * FROM reports ${where} ORDER BY created_at DESC`, params);
};
exports.listReports = listReports;
const getReport = async (userId, id) => {
    const rows = await (0, database_1.query)("SELECT * FROM reports WHERE user_id = ? AND id = ? LIMIT 1", [userId, id]);
    return rows[0] || null;
};
exports.getReport = getReport;
const createReport = async (report) => {
    const id = crypto_1.default.randomUUID();
    await (0, database_1.query)(`INSERT INTO reports
      (id, user_id, type, title, date_range, summary, score, deep_work_hours, fatigue_risk, focus_percentage,
       disruption_percentage, calm_percentage, stress_percentage, neutral_percentage, recommendations)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
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
    ]);
    return (0, exports.getReport)(report.userId, id);
};
exports.createReport = createReport;
//# sourceMappingURL=report.repository.js.map
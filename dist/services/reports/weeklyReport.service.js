"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWeeklyReport = void 0;
const dailyReport_service_1 = require("./dailyReport.service");
const generateWeeklyReport = async (userId) => {
    return (0, dailyReport_service_1.generateReport)(userId, "weekly", 7, "Weekly Wellness Report");
};
exports.generateWeeklyReport = generateWeeklyReport;
//# sourceMappingURL=weeklyReport.service.js.map
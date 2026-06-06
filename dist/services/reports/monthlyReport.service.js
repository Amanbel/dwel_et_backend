"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMonthlyReport = void 0;
const dailyReport_service_1 = require("./dailyReport.service");
const generateMonthlyReport = async (userId) => {
    return (0, dailyReport_service_1.generateReport)(userId, "monthly", 30, "Monthly Wellness Report");
};
exports.generateMonthlyReport = generateMonthlyReport;
//# sourceMappingURL=monthlyReport.service.js.map
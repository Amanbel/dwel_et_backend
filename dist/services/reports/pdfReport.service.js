"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPdfExportPlaceholder = void 0;
const createPdfExportPlaceholder = async (report) => ({
    reportId: report.id,
    downloadUrl: `/api/reports/${report.id}/export`,
    message: "PDF export is gated for premium plans and ready for provider implementation.",
});
exports.createPdfExportPlaceholder = createPdfExportPlaceholder;
//# sourceMappingURL=pdfReport.service.js.map
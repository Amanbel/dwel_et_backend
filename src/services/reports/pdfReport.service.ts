export const createPdfExportPlaceholder = async (report: any) => ({
  reportId: report.id,
  downloadUrl: `/api/reports/${report.id}/export`,
  message: "PDF export is gated for premium plans and ready for provider implementation.",
});

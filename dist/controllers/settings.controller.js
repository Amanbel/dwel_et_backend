"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const getSettings = async (_req, res) => {
    res.json({
        notifications: true,
        weeklyReports: true,
        privacyMode: true,
    });
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    res.json(req.body);
};
exports.updateSettings = updateSettings;
//# sourceMappingURL=settings.controller.js.map
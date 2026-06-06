"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestContent = void 0;
const contentIngestion_service_1 = require("../services/ingestion/contentIngestion.service");
const ingestContent = async (req, res) => {
    try {
        const result = await (0, contentIngestion_service_1.processContent)({
            ...req.body,
            user: req.user,
            userId: req.body.userId || req.user?.userId,
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            message: "Processing failed",
            detail: error.message,
        });
    }
};
exports.ingestContent = ingestContent;
//# sourceMappingURL=extension.controller.js.map
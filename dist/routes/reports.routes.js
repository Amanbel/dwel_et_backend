"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reports_controller_1 = require("../controllers/reports.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", reports_controller_1.index);
router.post("/generate", reports_controller_1.generate);
router.get("/:id", reports_controller_1.show);
router.get("/:id/export", reports_controller_1.exportPdf);
exports.default = router;
//# sourceMappingURL=reports.routes.js.map
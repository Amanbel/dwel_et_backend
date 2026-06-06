"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/dashboard", analytics_controller_1.dashboard);
router.get("/overview", analytics_controller_1.dashboard);
router.get("/categories", analytics_controller_1.categories);
router.get("/emotions/trends", analytics_controller_1.emotionalTrends);
router.get("/apps/impacts", analytics_controller_1.appImpacts);
router.get("/insights", analytics_controller_1.insights);
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map
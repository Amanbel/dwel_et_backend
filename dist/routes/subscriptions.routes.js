"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscriptions_controller_1 = require("../controllers/subscriptions.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/plans", subscriptions_controller_1.plans);
router.use(auth_middleware_1.authenticate);
router.get("/current", subscriptions_controller_1.current);
router.post("/checkout", subscriptions_controller_1.checkout);
router.post("/upgrade", subscriptions_controller_1.upgrade);
exports.default = router;
//# sourceMappingURL=subscriptions.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const extension_controller_1 = require("../controllers/extension.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/events", auth_middleware_1.authenticate, extension_controller_1.ingestContent);
exports.default = router;
//# sourceMappingURL=extension.routes.js.map
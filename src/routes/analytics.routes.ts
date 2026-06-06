import { Router } from "express";
import { appImpacts, categories, dashboard, emotionalTrends, insights } from "../controllers/analytics.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);
router.get("/dashboard", dashboard);
router.get("/overview", dashboard);
router.get("/categories", categories);
router.get("/emotions/trends", emotionalTrends);
router.get("/apps/impacts", appImpacts);
router.get("/insights", insights);

export default router;

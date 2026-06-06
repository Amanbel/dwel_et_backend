import { Router } from "express";
import { checkout, current, plans, upgrade } from "../controllers/subscriptions.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/plans", plans);
router.use(authenticate);
router.get("/current", current);
router.post("/checkout", checkout);
router.post("/upgrade", upgrade);

export default router;

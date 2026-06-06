import { Router } from "express";
import { sessions } from "../controllers/analytics.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, sessions);

export default router;

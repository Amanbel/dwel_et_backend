import { Router } from "express";
import { ingestContent } from "../controllers/extension.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/events", authenticate, ingestContent);

export default router;

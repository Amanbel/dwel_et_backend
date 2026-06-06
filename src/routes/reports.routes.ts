import { Router } from "express";
import { exportPdf, generate, index, show } from "../controllers/reports.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);
router.get("/", index);
router.post("/generate", generate);
router.get("/:id", show);
router.get("/:id/export", exportPdf);

export default router;

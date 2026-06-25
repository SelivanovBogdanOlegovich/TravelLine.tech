import { Router } from "express";
import { getStats, updateStats } from "../controllers/stats.controller";

const router = Router();

router.get("/", getStats);
router.put("/", updateStats);

export default router;

import { Router } from "express";
import {
  getPlatformTimeline,
  updatePlatformTimeline,
} from "../controllers/platformTimeline.controller";

const router = Router();

router.get("/", getPlatformTimeline);
router.put("/", updatePlatformTimeline);

export default router;

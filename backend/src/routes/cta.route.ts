import { Router } from "express";
import { getCta, updateCta } from "../controllers/cta.controller";

const router = Router();

router.get("/", getCta);
router.put("/", updateCta);

export default router;

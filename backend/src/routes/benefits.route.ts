import { Router } from "express";
import { getBenefits, updateBenefits } from "../controllers/benefits.controller";

const router = Router();

router.get("/", getBenefits);
router.put("/", updateBenefits);

export default router;

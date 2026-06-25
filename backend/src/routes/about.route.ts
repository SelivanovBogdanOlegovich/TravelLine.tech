import { Router } from "express";
import { getAbout, updateAbout } from "../controllers/about.controller";

const router = Router();

router.get("/", getAbout);
router.put("/", updateAbout);

export default router;

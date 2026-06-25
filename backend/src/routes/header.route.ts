import { Router } from "express";
import { getHeader, updateHeader } from "../controllers/header.controller";

const router = Router();

router.get("/", getHeader);
router.put("/", updateHeader);

export default router;

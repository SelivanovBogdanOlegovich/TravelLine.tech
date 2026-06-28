import { Router } from "express";
import { getTeam, updateTeam } from "../controllers/team.controller";

const router = Router();

router.get("/", getTeam);
router.put("/", updateTeam);

export default router;

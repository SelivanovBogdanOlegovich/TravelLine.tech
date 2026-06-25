import { Router } from "express";
import {
  getVacancies,
  updateVacancies,
} from "../controllers/vacancies.controller";

const router = Router();

router.get("/", getVacancies);
router.put("/", updateVacancies);

export default router;

import { Router } from "express";
import {
  getDirections,
  updateDirections,
} from "../controllers/directions.controller";

const router = Router();

router.get("/", getDirections);
router.put("/", updateDirections);

export default router;

import { Router } from "express";
import {
  getTestimonials,
  updateTestimonials,
} from "../controllers/testimonials.controller";

const router = Router();

router.get("/", getTestimonials);
router.put("/", updateTestimonials);

export default router;

import { Router } from "express";
import { getGallery, updateGallery } from "../controllers/gallery.controller";

const router = Router();

router.get("/", getGallery);
router.put("/", updateGallery);

export default router;

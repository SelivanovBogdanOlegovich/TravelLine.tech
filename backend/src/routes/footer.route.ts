import { Router } from "express";
import { getFooter, updateFooter } from "../controllers/footer.controller";

const router = Router();

router.get("/", getFooter);
router.put("/", updateFooter);

export default router;

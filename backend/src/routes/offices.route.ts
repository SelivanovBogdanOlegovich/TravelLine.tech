import { Router } from "express";
import { getOffices, updateOffices } from "../controllers/offices.controller";

const router = Router();

router.get("/", getOffices);
router.put("/", updateOffices);

export default router;

import { Router } from "express";
import { getClients, updateClients } from "../controllers/clients.controller";

const router = Router();

router.get("/", getClients);
router.put("/", updateClients);

export default router;

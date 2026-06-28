import { Router } from "express";
import { getContact, updateContact } from "../controllers/contact.controller";

const router = Router();

router.get("/", getContact);
router.put("/", updateContact);

export default router;

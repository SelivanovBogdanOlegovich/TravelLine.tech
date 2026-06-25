"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cta_controller_1 = require("../controllers/cta.controller");
const router = (0, express_1.Router)();
router.get("/", cta_controller_1.getCta);
router.put("/", cta_controller_1.updateCta);
exports.default = router;

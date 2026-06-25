"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const benefits_controller_1 = require("../controllers/benefits.controller");
const router = (0, express_1.Router)();
router.get("/", benefits_controller_1.getBenefits);
router.put("/", benefits_controller_1.updateBenefits);
exports.default = router;

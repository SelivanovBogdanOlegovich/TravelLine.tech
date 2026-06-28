"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const platformTimeline_controller_1 = require("../controllers/platformTimeline.controller");
const router = (0, express_1.Router)();
router.get("/", platformTimeline_controller_1.getPlatformTimeline);
router.put("/", platformTimeline_controller_1.updatePlatformTimeline);
exports.default = router;

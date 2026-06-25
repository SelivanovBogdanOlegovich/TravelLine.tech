"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_controller_1 = require("../controllers/stats.controller");
const router = (0, express_1.Router)();
router.get("/", stats_controller_1.getStats);
router.put("/", stats_controller_1.updateStats);
exports.default = router;

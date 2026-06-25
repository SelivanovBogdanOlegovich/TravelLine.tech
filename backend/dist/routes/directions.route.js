"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const directions_controller_1 = require("../controllers/directions.controller");
const router = (0, express_1.Router)();
router.get("/", directions_controller_1.getDirections);
router.put("/", directions_controller_1.updateDirections);
exports.default = router;

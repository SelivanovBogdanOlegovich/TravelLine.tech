"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const header_controller_1 = require("../controllers/header.controller");
const router = (0, express_1.Router)();
router.get("/", header_controller_1.getHeader);
router.put("/", header_controller_1.updateHeader);
exports.default = router;

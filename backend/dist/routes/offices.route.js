"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const offices_controller_1 = require("../controllers/offices.controller");
const router = (0, express_1.Router)();
router.get("/", offices_controller_1.getOffices);
router.put("/", offices_controller_1.updateOffices);
exports.default = router;

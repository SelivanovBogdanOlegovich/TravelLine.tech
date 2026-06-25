"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hero_controller_1 = require("../controllers/hero.controller");
const router = (0, express_1.Router)();
router.get("/", hero_controller_1.getHero);
router.put("/", hero_controller_1.updateHero);
exports.default = router;

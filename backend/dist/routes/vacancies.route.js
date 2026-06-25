"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacancies_controller_1 = require("../controllers/vacancies.controller");
const router = (0, express_1.Router)();
router.get("/", vacancies_controller_1.getVacancies);
router.put("/", vacancies_controller_1.updateVacancies);
exports.default = router;

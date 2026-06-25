"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const footer_controller_1 = require("../controllers/footer.controller");
const router = (0, express_1.Router)();
router.get("/", footer_controller_1.getFooter);
router.put("/", footer_controller_1.updateFooter);
exports.default = router;

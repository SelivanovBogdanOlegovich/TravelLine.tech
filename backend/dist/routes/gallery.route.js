"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_controller_1 = require("../controllers/gallery.controller");
const router = (0, express_1.Router)();
router.get("/", gallery_controller_1.getGallery);
router.put("/", gallery_controller_1.updateGallery);
exports.default = router;

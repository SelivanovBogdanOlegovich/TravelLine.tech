"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_controller_1 = require("../controllers/clients.controller");
const router = (0, express_1.Router)();
router.get("/", clients_controller_1.getClients);
router.put("/", clients_controller_1.updateClients);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const health_service_1 = require("../services/health.service");
const getHealth = (req, res) => {
    res.status(200).json((0, health_service_1.getHealthStatus)());
};
exports.getHealth = getHealth;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStats = exports.getStats = void 0;
const content_service_1 = require("../services/content.service");
const getStats = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.stats);
    }
    catch (error) {
        next(error);
    }
};
exports.getStats = getStats;
const updateStats = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.stats = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.stats);
    }
    catch (error) {
        next(error);
    }
};
exports.updateStats = updateStats;

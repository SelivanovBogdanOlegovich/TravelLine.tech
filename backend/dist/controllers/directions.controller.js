"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDirections = exports.getDirections = void 0;
const content_service_1 = require("../services/content.service");
const getDirections = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.directions);
    }
    catch (error) {
        next(error);
    }
};
exports.getDirections = getDirections;
const updateDirections = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.directions = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.directions);
    }
    catch (error) {
        next(error);
    }
};
exports.updateDirections = updateDirections;

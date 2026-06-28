"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlatformTimeline = exports.getPlatformTimeline = void 0;
const content_service_1 = require("../services/content.service");
const getPlatformTimeline = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.platformTimeline);
    }
    catch (error) {
        next(error);
    }
};
exports.getPlatformTimeline = getPlatformTimeline;
const updatePlatformTimeline = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.platformTimeline = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.platformTimeline);
    }
    catch (error) {
        next(error);
    }
};
exports.updatePlatformTimeline = updatePlatformTimeline;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAbout = exports.getAbout = void 0;
const content_service_1 = require("../services/content.service");
const getAbout = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.about);
    }
    catch (error) {
        next(error);
    }
};
exports.getAbout = getAbout;
const updateAbout = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.about = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.about);
    }
    catch (error) {
        next(error);
    }
};
exports.updateAbout = updateAbout;

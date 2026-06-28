"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGallery = exports.getGallery = void 0;
const content_service_1 = require("../services/content.service");
const getGallery = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.gallery);
    }
    catch (error) {
        next(error);
    }
};
exports.getGallery = getGallery;
const updateGallery = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.gallery = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.gallery);
    }
    catch (error) {
        next(error);
    }
};
exports.updateGallery = updateGallery;

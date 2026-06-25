"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContent = exports.getContent = void 0;
const content_service_1 = require("../services/content.service");
const getContent = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content);
    }
    catch (error) {
        next(error);
    }
};
exports.getContent = getContent;
const updateContent = async (req, res, next) => {
    try {
        await (0, content_service_1.writeContent)(req.body);
        res.status(200).json(req.body);
    }
    catch (error) {
        next(error);
    }
};
exports.updateContent = updateContent;

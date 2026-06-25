"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFooter = exports.getFooter = void 0;
const content_service_1 = require("../services/content.service");
const getFooter = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.footer);
    }
    catch (error) {
        next(error);
    }
};
exports.getFooter = getFooter;
const updateFooter = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.footer = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.footer);
    }
    catch (error) {
        next(error);
    }
};
exports.updateFooter = updateFooter;

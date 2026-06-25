"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHeader = exports.getHeader = void 0;
const content_service_1 = require("../services/content.service");
const getHeader = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.header);
    }
    catch (error) {
        next(error);
    }
};
exports.getHeader = getHeader;
const updateHeader = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.header = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.header);
    }
    catch (error) {
        next(error);
    }
};
exports.updateHeader = updateHeader;

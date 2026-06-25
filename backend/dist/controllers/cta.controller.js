"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCta = exports.getCta = void 0;
const content_service_1 = require("../services/content.service");
const getCta = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.cta);
    }
    catch (error) {
        next(error);
    }
};
exports.getCta = getCta;
const updateCta = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.cta = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.cta);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCta = updateCta;

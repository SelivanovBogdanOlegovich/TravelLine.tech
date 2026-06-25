"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBenefits = exports.getBenefits = void 0;
const content_service_1 = require("../services/content.service");
const getBenefits = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.benefits);
    }
    catch (error) {
        next(error);
    }
};
exports.getBenefits = getBenefits;
const updateBenefits = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.benefits = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.benefits);
    }
    catch (error) {
        next(error);
    }
};
exports.updateBenefits = updateBenefits;

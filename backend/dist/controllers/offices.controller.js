"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOffices = exports.getOffices = void 0;
const content_service_1 = require("../services/content.service");
const getOffices = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.offices);
    }
    catch (error) {
        next(error);
    }
};
exports.getOffices = getOffices;
const updateOffices = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.offices = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.offices);
    }
    catch (error) {
        next(error);
    }
};
exports.updateOffices = updateOffices;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.getContact = void 0;
const content_service_1 = require("../services/content.service");
const getContact = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.contact);
    }
    catch (error) {
        next(error);
    }
};
exports.getContact = getContact;
const updateContact = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.contact = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.contact);
    }
    catch (error) {
        next(error);
    }
};
exports.updateContact = updateContact;

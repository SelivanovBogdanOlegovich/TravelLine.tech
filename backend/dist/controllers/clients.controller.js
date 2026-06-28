"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClients = exports.getClients = void 0;
const content_service_1 = require("../services/content.service");
const getClients = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.clients);
    }
    catch (error) {
        next(error);
    }
};
exports.getClients = getClients;
const updateClients = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.clients = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.clients);
    }
    catch (error) {
        next(error);
    }
};
exports.updateClients = updateClients;

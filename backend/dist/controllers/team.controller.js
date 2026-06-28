"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeam = exports.getTeam = void 0;
const content_service_1 = require("../services/content.service");
const getTeam = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.team);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeam = getTeam;
const updateTeam = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.team = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.team);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTeam = updateTeam;

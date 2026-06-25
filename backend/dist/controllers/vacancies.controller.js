"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVacancies = exports.getVacancies = void 0;
const content_service_1 = require("../services/content.service");
const getVacancies = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.vacancies);
    }
    catch (error) {
        next(error);
    }
};
exports.getVacancies = getVacancies;
const updateVacancies = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.vacancies = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.vacancies);
    }
    catch (error) {
        next(error);
    }
};
exports.updateVacancies = updateVacancies;

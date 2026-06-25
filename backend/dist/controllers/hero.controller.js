"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHero = exports.getHero = void 0;
const content_service_1 = require("../services/content.service");
const getHero = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.hero);
    }
    catch (error) {
        next(error);
    }
};
exports.getHero = getHero;
const updateHero = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.hero = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.hero);
    }
    catch (error) {
        next(error);
    }
};
exports.updateHero = updateHero;

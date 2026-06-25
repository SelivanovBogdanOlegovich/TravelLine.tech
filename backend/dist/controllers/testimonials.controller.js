"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonials = exports.getTestimonials = void 0;
const content_service_1 = require("../services/content.service");
const getTestimonials = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        res.status(200).json(content.testimonials);
    }
    catch (error) {
        next(error);
    }
};
exports.getTestimonials = getTestimonials;
const updateTestimonials = async (req, res, next) => {
    try {
        const content = await (0, content_service_1.readContent)();
        content.testimonials = req.body;
        await (0, content_service_1.writeContent)(content);
        res.status(200).json(content.testimonials);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTestimonials = updateTestimonials;

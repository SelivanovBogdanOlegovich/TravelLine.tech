"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_route_1 = __importDefault(require("./routes/about.route"));
const benefits_route_1 = __importDefault(require("./routes/benefits.route"));
const content_route_1 = __importDefault(require("./routes/content.route"));
const cta_route_1 = __importDefault(require("./routes/cta.route"));
const directions_route_1 = __importDefault(require("./routes/directions.route"));
const footer_route_1 = __importDefault(require("./routes/footer.route"));
const health_route_1 = __importDefault(require("./routes/health.route"));
const header_route_1 = __importDefault(require("./routes/header.route"));
const hero_route_1 = __importDefault(require("./routes/hero.route"));
const stats_route_1 = __importDefault(require("./routes/stats.route"));
const testimonials_route_1 = __importDefault(require("./routes/testimonials.route"));
const vacancies_route_1 = __importDefault(require("./routes/vacancies.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/health", health_route_1.default);
app.use("/api/content", content_route_1.default);
app.use("/api/header", header_route_1.default);
app.use("/api/hero", hero_route_1.default);
app.use("/api/directions", directions_route_1.default);
app.use("/api/about", about_route_1.default);
app.use("/api/benefits", benefits_route_1.default);
app.use("/api/testimonials", testimonials_route_1.default);
app.use("/api/cta", cta_route_1.default);
app.use("/api/stats", stats_route_1.default);
app.use("/api/vacancies", vacancies_route_1.default);
app.use("/api/footer", footer_route_1.default);
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: "Internal server error",
    });
});
exports.default = app;

import express, { NextFunction, Request, Response } from "express";
import aboutRouter from "./routes/about.route";
import benefitsRouter from "./routes/benefits.route";
import clientsRouter from "./routes/clients.route";
import contactRouter from "./routes/contact.route";
import contentRouter from "./routes/content.route";
import ctaRouter from "./routes/cta.route";
import directionsRouter from "./routes/directions.route";
import footerRouter from "./routes/footer.route";
import galleryRouter from "./routes/gallery.route";
import healthRouter from "./routes/health.route";
import headerRouter from "./routes/header.route";
import heroRouter from "./routes/hero.route";
import officesRouter from "./routes/offices.route";
import platformTimelineRouter from "./routes/platformTimeline.route";
import statsRouter from "./routes/stats.route";
import testimonialsRouter from "./routes/testimonials.route";
import teamRouter from "./routes/team.route";
import vacanciesRouter from "./routes/vacancies.route";

const app = express();

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/content", contentRouter);
app.use("/api/header", headerRouter);
app.use("/api/hero", heroRouter);
app.use("/api/directions", directionsRouter);
app.use("/api/about", aboutRouter);
app.use("/api/team", teamRouter);
app.use("/api/platform-timeline", platformTimelineRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/offices", officesRouter);
app.use("/api/benefits", benefitsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/cta", ctaRouter);
app.use("/api/stats", statsRouter);
app.use("/api/vacancies", vacanciesRouter);
app.use("/api/footer", footerRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

export default app;

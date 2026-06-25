import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.testimonials);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.testimonials = req.body;

    await writeContent(content);

    res.status(200).json(content.testimonials);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getAbout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.about);
  } catch (error) {
    next(error);
  }
};

export const updateAbout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.about = req.body;

    await writeContent(content);

    res.status(200).json(content.about);
  } catch (error) {
    next(error);
  }
};

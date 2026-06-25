import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getCta = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.cta);
  } catch (error) {
    next(error);
  }
};

export const updateCta = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.cta = req.body;

    await writeContent(content);

    res.status(200).json(content.cta);
  } catch (error) {
    next(error);
  }
};

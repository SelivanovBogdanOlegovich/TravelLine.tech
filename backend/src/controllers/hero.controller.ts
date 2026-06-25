import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getHero = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.hero);
  } catch (error) {
    next(error);
  }
};

export const updateHero = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.hero = req.body;

    await writeContent(content);

    res.status(200).json(content.hero);
  } catch (error) {
    next(error);
  }
};

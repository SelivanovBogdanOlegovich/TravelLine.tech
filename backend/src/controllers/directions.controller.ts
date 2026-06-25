import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getDirections = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.directions);
  } catch (error) {
    next(error);
  }
};

export const updateDirections = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.directions = req.body;

    await writeContent(content);

    res.status(200).json(content.directions);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await writeContent(req.body);

    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
};

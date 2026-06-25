import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getFooter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.footer);
  } catch (error) {
    next(error);
  }
};

export const updateFooter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.footer = req.body;

    await writeContent(content);

    res.status(200).json(content.footer);
  } catch (error) {
    next(error);
  }
};

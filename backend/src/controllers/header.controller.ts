import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getHeader = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.header);
  } catch (error) {
    next(error);
  }
};

export const updateHeader = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.header = req.body;

    await writeContent(content);

    res.status(200).json(content.header);
  } catch (error) {
    next(error);
  }
};

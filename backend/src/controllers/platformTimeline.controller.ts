import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getPlatformTimeline = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.platformTimeline);
  } catch (error) {
    next(error);
  }
};

export const updatePlatformTimeline = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.platformTimeline = req.body;

    await writeContent(content);

    res.status(200).json(content.platformTimeline);
  } catch (error) {
    next(error);
  }
};

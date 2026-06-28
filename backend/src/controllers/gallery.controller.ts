import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getGallery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.gallery);
  } catch (error) {
    next(error);
  }
};

export const updateGallery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.gallery = req.body;

    await writeContent(content);

    res.status(200).json(content.gallery);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getBenefits = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.benefits);
  } catch (error) {
    next(error);
  }
};

export const updateBenefits = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.benefits = req.body;

    await writeContent(content);

    res.status(200).json(content.benefits);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getVacancies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.vacancies);
  } catch (error) {
    next(error);
  }
};

export const updateVacancies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.vacancies = req.body;

    await writeContent(content);

    res.status(200).json(content.vacancies);
  } catch (error) {
    next(error);
  }
};

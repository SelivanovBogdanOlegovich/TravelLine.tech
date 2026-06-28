import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getOffices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.offices);
  } catch (error) {
    next(error);
  }
};

export const updateOffices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.offices = req.body;

    await writeContent(content);

    res.status(200).json(content.offices);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.contact = req.body;

    await writeContent(content);

    res.status(200).json(content.contact);
  } catch (error) {
    next(error);
  }
};

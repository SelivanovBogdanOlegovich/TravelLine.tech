import { NextFunction, Request, Response } from "express";
import { readContent, writeContent } from "../services/content.service";

export const getClients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    res.status(200).json(content.clients);
  } catch (error) {
    next(error);
  }
};

export const updateClients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await readContent();

    content.clients = req.body;

    await writeContent(content);

    res.status(200).json(content.clients);
  } catch (error) {
    next(error);
  }
};

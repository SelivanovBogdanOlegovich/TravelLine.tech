import { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service";

export const getHealth = (req: Request, res: Response) => {
  res.status(200).json(getHealthStatus());
};

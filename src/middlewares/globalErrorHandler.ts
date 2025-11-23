import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/appError";
import envConfig from "../config/env";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Server error";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: envConfig.node_env == "development" ? error.stack : null,
  });
};

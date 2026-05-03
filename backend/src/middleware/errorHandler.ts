import { logger } from '@/configs';
import { AppError } from '@/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    const { statusCode = 500, message } = err;
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.issues[0].message,
    });
  }

  logger.error(err);

  res.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
}

import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten(),
      });
    }

    req.body = result.data; // sanitized + validated
    next();
  };

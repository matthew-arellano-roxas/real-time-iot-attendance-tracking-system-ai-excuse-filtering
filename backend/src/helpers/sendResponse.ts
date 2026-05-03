import { Response } from 'express';
import { ApiResponse } from '@/types';
export function sendResponse<T>(
  res: Response,
  data: T,
  meta?: Record<string, unknown>,
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta,
  };

  return res.json(response);
}

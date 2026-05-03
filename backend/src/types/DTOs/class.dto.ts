import { Request } from 'express';
import { classSchema } from '@/schemas';
import z from 'zod';

export type CreateClassRequest = Request<
  Record<string, never>,
  unknown,
  ClassDTO
>;
export type ClassDTO = z.infer<typeof classSchema>;

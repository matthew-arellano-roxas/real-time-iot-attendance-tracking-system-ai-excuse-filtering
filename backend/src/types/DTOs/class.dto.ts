import { Request } from 'express';
import { createClassSchema, updateClassSchema } from '@/schemas';
import z from 'zod';
import { getClassQuerySchema } from '@/schemas/class.schema';

export type CreateClassRequestDTO = z.infer<typeof createClassSchema>;

export type UpdateClassRequest = Request<
  { classId: number },
  unknown,
  UpdateClassRequestDTO
>;
export type UpdateClassRequestDTO = z.infer<typeof updateClassSchema>;

export type GetClassListRequestDTO = z.infer<typeof getClassQuerySchema>;

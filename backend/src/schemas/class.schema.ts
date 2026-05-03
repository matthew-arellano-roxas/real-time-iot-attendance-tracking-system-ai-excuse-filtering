import { ClassStatus } from '@prisma/client';
import { z } from 'zod';

export const createClassSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Class name must be at least 2 characters long' }),
    allowJoins: z.boolean(),
    schoolYear: z.string(),
    status: z.enum(ClassStatus),
  })
  .strict();

export const updateClassSchema = createClassSchema.partial();

export const getClassQuerySchema = z.object({
  name: z.string().optional(),
  schoolYear: z.string().optional(),
  status: z.enum(ClassStatus).optional(),
  educatorId: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const classIdSchema = z.object({
  classId: z.number(),
});

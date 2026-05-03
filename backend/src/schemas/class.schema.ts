import { ClassStatus } from '@prisma/client';
import { z } from 'zod';

export const classSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Class name must be at least 2 characters long' }),
    allowJoins: z.boolean(),
    schoolYear: z.string(),
    status: z.enum(ClassStatus),
  })
  .strict();

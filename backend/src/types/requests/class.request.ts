import { Request } from 'express';
import { CreateClassRequestDTO, GetClassListRequestDTO } from '@/types/dtos';

export type CreateClassRequest = Request<
  Record<string, never>,
  unknown,
  CreateClassRequestDTO
>;
export type GetClassListRequest = Request<
  unknown,
  unknown,
  unknown,
  GetClassListRequestDTO
>;

export type UpdateClassRequest = Request<
  { classId: number },
  unknown,
  CreateClassRequestDTO
>;

export type DeleteClassRequest = Request<{ classId: number }>;
export type GetClassRequest = Request<{ classId: number }>;

import {
  CreateClassRequest,
  GetClassListRequest,
  UpdateClassRequest,
  DeleteClassRequest,
  GetClassRequest,
} from '@/types/requests';
import { AuthRequest } from '@/types';
import { NextFunction, Response } from 'express';

export interface ClassController {
  createClass: (
    req: CreateClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  updateClass: (
    req: UpdateClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  deleteClass: (
    req: DeleteClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  getClassById: (
    req: GetClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  getEducatorClassList: (
    req: GetClassListRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  getStudentClassList: (
    req: GetClassListRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
}

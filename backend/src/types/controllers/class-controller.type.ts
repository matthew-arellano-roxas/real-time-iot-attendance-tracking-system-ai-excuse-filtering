import {
  CreateClassRequest,
  GetClassListRequest,
  UpdateClassRequest,
  DeleteClassRequest,
  GetClassRequest,
} from '@/types/requests';
import { NextFunction, Response } from 'express';

export interface ClassController {
  createClass: (
    req: CreateClassRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  updateClass: (
    req: UpdateClassRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  deleteClass: (
    req: DeleteClassRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  getClassById: (
    req: GetClassRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  getEducatorClassList: (
    req: GetClassListRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
  getStudentClassList: (
    req: GetClassListRequest,
    res: Response,
    _next: NextFunction,
  ) => Promise<void>;
}

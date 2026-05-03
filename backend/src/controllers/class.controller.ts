import { sendResponse } from '@/helpers/sendResponse';
import { ClassService } from '@/services/class.service';
import { AuthRequest } from '@/types';
import { CreateClassRequest } from '@/types/DTOs/class.dto';
import { NextFunction, RequestHandler, Response } from 'express';

export interface ClassController {
  createClass: RequestHandler;
  updateClass: RequestHandler;
  deleteClass: RequestHandler;
  getClassById: RequestHandler;
  getEducatorClassList: RequestHandler;
  getStudentClassList: RequestHandler;
}

export function getClassController(classService: ClassService) {
  const createClass = async function (
    req: CreateClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ) {
    const { sub: educatorId } = req.user;
    const payload = req.body;

    const classEntry = await classService.createClass(educatorId, payload);
    sendResponse(res, classEntry);
  };

  return {
    createClass,
  } as ClassController;
}

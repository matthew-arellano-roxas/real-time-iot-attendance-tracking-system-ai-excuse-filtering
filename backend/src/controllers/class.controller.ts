import { sendResponse } from '@/helpers/sendResponse';
import { ClassService } from '@/services/class.service';
import { AuthRequest } from '@/types';
import {
  CreateClassRequest,
  GetClassListRequest,
  UpdateClassRequest,
  DeleteClassRequest,
  GetClassRequest,
} from '@/types/requests';
import { NextFunction, Response } from 'express';
import { type ClassController } from '@/types/controllers';

export function createClassService(
  classService: ClassService,
): ClassController {
  const createClass = async function (
    req: CreateClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { sub: educatorId } = req.user;
    const payload = req.body;

    const classEntry = await classService.createClass(educatorId, payload);
    sendResponse(res, classEntry);
  };

  const updateClass = async function (
    req: UpdateClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { classId } = req.params;
    const payload = req.body;
    const classEntry = await classService.updateClass(classId, payload);
    sendResponse(res, classEntry);
  };

  const deleteClass = async function (
    req: DeleteClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { classId } = req.params;
    const classEntry = await classService.deleteClass(classId);
    sendResponse(res, classEntry);
  };

  const getClassById = async function (
    req: GetClassRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { classId } = req.params;
    const classEntry = await classService.getClassById(classId);
    sendResponse(res, classEntry);
  };

  const getEducatorClassList = async function (
    req: GetClassListRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { sub: educatorId } = req.user;
    const query = req.query;
    const classList = await classService.getEducatorClassList(
      educatorId,
      query,
    );
    sendResponse(res, classList);
  };

  const getStudentClassList = async function (
    req: GetClassListRequest & AuthRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { sub: studentId } = req.user;
    const query = req.query;
    const classList = await classService.getStudentClassList(studentId, query);
    sendResponse(res, classList);
  };

  return {
    createClass,
    updateClass,
    deleteClass,
    getClassById,
    getEducatorClassList,
    getStudentClassList,
  } as ClassController;
}

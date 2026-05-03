import { CreateClassRequestDTO, UpdateClassRequestDTO } from '@/types/dtos';
import { Class } from '@prisma/client';
import { ClassListQuery } from '@/types';

export interface ClassService {
  createClass: (
    educatorId: number,
    payload: CreateClassRequestDTO,
  ) => Promise<Class>;
  updateClass: (
    classId: number,
    payload: UpdateClassRequestDTO,
  ) => Promise<Class>;
  deleteClass: (classId: number) => Promise<Class>;
  getClassById: (classId: number) => Promise<Class | null>;
  getEducatorClassList: (
    educatorId: number,
    query: ClassListQuery,
  ) => Promise<Class[]>;
  getStudentClassList: (
    studentId: number,
    query: ClassListQuery,
  ) => Promise<Class[]>;
}

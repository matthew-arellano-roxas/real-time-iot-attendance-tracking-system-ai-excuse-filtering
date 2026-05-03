import { CreateClassRequestDTO, UpdateClassRequestDTO } from '@/types/dtos';
import { PrismaClient } from '@prisma/client';
import { generateCode } from '@/helpers/generateCode';
import { ClassWhereInput } from '@root/generated/prisma/models';
import { getPagination } from '@/helpers/getPagination';
import { Role } from '@root/generated/prisma/enums';
import { type RoleService } from '@/types/services';
import { NotFoundError } from '@/errors';
import { ClassListQuery } from '@/types';
import { type ClassService } from '@/types/services';

export const createClassService = function (
  prisma: PrismaClient,
  roleService: RoleService,
): ClassService {
  const createClass = async function (
    educatorId: number,
    payload: CreateClassRequestDTO,
    role?: Role,
  ) {
    roleService.checkEducator(educatorId, role);

    return prisma.class.create({
      data: {
        name: payload.name,
        allowJoins: payload.allowJoins,
        schoolYear: payload.schoolYear,
        status: payload.status,
        createdAt: new Date(),
        educatorId: educatorId,
        joinCode: await generateClassCode(),
      },
    });
  };

  const generateClassCode = async function (
    retryCount: number = 5,
  ): Promise<string> {
    for (let attempt = 0; attempt < retryCount; attempt++) {
      const classCode = generateCode('CLS');

      const existingClass = await prisma.class.findUnique({
        where: { joinCode: classCode },
      });

      if (!existingClass) {
        return classCode;
      }
    }

    throw new Error('Failed to generate unique class code after retries');
  };

  const updateClass = async function (
    classId: number,
    payload: UpdateClassRequestDTO,
  ) {
    const existing = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!existing) {
      throw new NotFoundError('Class not found');
    }

    return prisma.class.update({
      where: { id: classId },
      data: payload,
    });
  };

  const deleteClass = async function (classId: number) {
    const existing = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!existing) {
      throw new NotFoundError('Class not found');
    }

    return prisma.class.delete({
      where: { id: classId },
    });
  };

  const getClassById = async function (classId: number) {
    const classEntry = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classEntry) {
      throw new NotFoundError('Class not found');
    }

    return classEntry;
  };

  const getEducatorClassList = async function (
    educatorId: number,
    query: ClassListQuery,
  ) {
    const pagination = getPagination(query.page, query.limit);
    const where: ClassWhereInput = {};
    where.educatorId = educatorId;
    where.schoolYear = query.schoolYear;
    where.name = query.name;

    return prisma.class.findMany({
      where,
      ...pagination,
    });
  };

  const getStudentClassList = async function (
    studentId: number,
    query: ClassListQuery,
  ) {
    const { page = 1, limit = 10, educatorId, schoolYear, name } = query;

    const pagination = getPagination(page, limit);

    return prisma.class.findMany({
      where: {
        students: {
          some: {
            userId: studentId,
          },
        },
        ...(educatorId && { educatorId }),
        ...(schoolYear && { schoolYear }),
        ...(name && {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        }),
      },
      ...pagination,
    });
  };

  return {
    createClass,
    updateClass,
    deleteClass,
    getClassById,
    getEducatorClassList,
    getStudentClassList,
  };
};

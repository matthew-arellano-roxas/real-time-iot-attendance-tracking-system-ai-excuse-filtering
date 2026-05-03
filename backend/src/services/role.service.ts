import { PrismaClient } from '@prisma/client';
import { Role } from '@root/generated/prisma/enums';
import { AppError, StatusCode } from '@/errors';

export interface RoleService {
  checkEducator: (educatorId: number, role?: Role) => Promise<void>;
}

export function getRoleService(prisma: PrismaClient): RoleService {
  const checkEducator = async function (educatorId: number, role?: Role) {
    if (isEducator(role)) {
      throw new AppError('Unauthorized', StatusCode.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({
      where: { id: educatorId },
      select: { role: true },
    });

    if (user === null) {
      throw new AppError('User not found', StatusCode.UNAUTHORIZED);
    }

    if (user.role !== Role.EDUCATOR) {
      throw new AppError('Unauthorized', StatusCode.UNAUTHORIZED);
    }
  };

  const isEducator = function (role: Role | undefined) {
    return role === Role.EDUCATOR;
  };

  return {
    checkEducator,
  };
}

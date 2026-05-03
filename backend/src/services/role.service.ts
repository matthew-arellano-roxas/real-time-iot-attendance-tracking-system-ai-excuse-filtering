import { PrismaClient } from '@prisma/client';
import { Role } from '@root/generated/prisma/enums';
import { ForbiddenError, NotFoundError } from '@/errors';
import { RoleService } from '@/types/services';

export function getRoleService(prisma: PrismaClient): RoleService {
  const checkEducator = async function (educatorId: number, role?: Role) {
    if (isEducator(role)) {
      throw new ForbiddenError('Action not permitted');
    }

    const user = await prisma.user.findUnique({
      where: { id: educatorId },
      select: { role: true },
    });

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    if (user.role !== Role.EDUCATOR) {
      throw new ForbiddenError('Action not permitted');
    }
  };

  const isEducator = function (role: Role | undefined) {
    return role === Role.EDUCATOR;
  };

  return {
    checkEducator,
  };
}

import { Role } from '@root/generated/prisma/enums';

export interface RoleService {
  checkEducator: (educatorId: number, role?: Role) => Promise<void>;
}

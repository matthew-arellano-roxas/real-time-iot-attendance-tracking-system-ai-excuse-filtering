import { Request } from 'express';
import { JwtPayload } from '@/types/auth.types';
import { UnauthorizedError } from '@/errors';

export type AuthenticatedRequest = Request & {
  user: JwtPayload;
};

export function assertAuth(req: Request): asserts req is AuthenticatedRequest {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }
}

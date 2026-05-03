import { env } from '@/configs';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function signJwt(user: User) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatarUrl,
    },
    env.JWT_SECRET,
    { expiresIn: '1h' },
  );
}

export function RequestTokenVerifier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET!);
    req.user = payload;
    next();
  } catch {
    return res.sendStatus(403);
  }
}

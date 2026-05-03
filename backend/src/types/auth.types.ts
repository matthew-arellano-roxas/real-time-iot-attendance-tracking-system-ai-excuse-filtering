export interface AuthRequest extends Request {
  user: JwtPayload;
}

export type JwtPayload = {
  sub: number;
  email: string;
  name: string;
  avatar: string | null;
};

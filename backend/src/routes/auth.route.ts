import { User } from '@prisma/client';
import express from 'express';
import passport from 'passport';
import { signJwt, RequestTokenVerifier } from '@/middleware/auth.middleware';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    const user = req.user as User;
    const token = signJwt(user);
    res.json({ token });
  },
);

router.get('/protected-route', RequestTokenVerifier, (req, res) => {
  res.send('Authenticated!');
});

export { router as authRouter };

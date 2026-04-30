import '@/helpers/loadEnv';

import 'dotenv/config';
import express, { Request, Response } from 'express';
import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import session from 'express-session';
import { env } from '@/config';

const app = express();

// Session setup
app.use(
  session({
    secret: env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Passport Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: env.GOOGLE_CALLBACK_URL as string,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      // You can cast profile or map it to your database user
      return done(null, profile);
    },
  ),
);

// // Serialization
// passport.serializeUser((user: unknown, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj: unknown, done) => {
//   done(null, obj);
// });

// Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    res.redirect('/profile');
  },
);
app.listen(3000, () =>
  console.log(`Server running on http://localhost:${env.PORT}`),
);

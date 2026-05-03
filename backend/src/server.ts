import '@/helpers/loadEnv';

import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import { env } from '@/configs';
import { googleStrategy } from '@/configs/strategy';
import { authRouter } from '@/routes/auth.route';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Passport Strategy
passport.use(googleStrategy);

// Routes
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(env.PORT, () =>
  console.log(`Server running on http://localhost:${env.PORT}`),
);

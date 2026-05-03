import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import { OAuthProvider, Role } from '@prisma/client';
import { env } from '@/configs/env';
import { prisma } from '@root/lib/prisma';

const strategyConfig = {
  clientID: env.GOOGLE_CLIENT_ID as string,
  clientSecret: env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: env.GOOGLE_CALLBACK_URL as string,
};

async function strategyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) {
  try {
    const email = profile.emails?.[0]?.value;
    const avatarUrl = profile.photos?.[0]?.value;

    if (!email) {
      return done(new Error('Google account did not provide an email.'));
    }

    const user = await prisma.user.upsert({
      where: {
        oauthProviderId: profile.id,
      },
      update: {
        email,
        name: profile.displayName,
        avatarUrl,
      },
      create: {
        email,
        name: profile.displayName,
        avatarUrl,
        oauthProvider: OAuthProvider.GOOGLE,
        oauthProviderId: profile.id,
        role: Role.STUDENT,
      },
    });

    return done(null, user);
  } catch (error: unknown) {
    return done(error as Error);
  }
}

const googleStrategy = new GoogleStrategy(strategyConfig, strategyCallback);

export { googleStrategy };

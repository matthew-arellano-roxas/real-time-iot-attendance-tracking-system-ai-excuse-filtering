export const env = {
  PORT: process.env.PORT || 4000,
  DATABASE_URL:
    process.env.DATABASE || 'postgres://postgres:postgres@localhost:5432/mydb',
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

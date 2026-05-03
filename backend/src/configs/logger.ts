// logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // minimum level to log
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    // log to console
    new winston.transports.Console(),

    // log errors only to file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // log all levels
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

export { logger };

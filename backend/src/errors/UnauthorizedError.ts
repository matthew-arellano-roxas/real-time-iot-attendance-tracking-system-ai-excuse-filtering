import { AppError } from './AppError';
import { StatusCode } from './StatusCode';

export class UnauthorizedError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

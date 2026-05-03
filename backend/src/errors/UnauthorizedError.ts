import { AppError } from './AppError';
import { StatusCode } from './StatusCode';

export class UnauthorizedError extends AppError {
  constructor(message = '401 Unauthorized') {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

import { AppError } from './AppError';
import { StatusCode } from './StatusCode';

export class ForbiddenError extends AppError {
  constructor(message = '403 Forbidden') {
    super(message, StatusCode.FORBIDDEN);
  }
}

import { AppError } from './AppError';
import { StatusCode } from './StatusCode';

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, StatusCode.NOT_FOUND);
  }
}

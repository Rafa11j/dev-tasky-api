import { AppError } from './AppError';

class EntityNotFoundException extends AppError {
  constructor(entity: string) {
    super(`${entity} not found!`);
  }
}

export { EntityNotFoundException };

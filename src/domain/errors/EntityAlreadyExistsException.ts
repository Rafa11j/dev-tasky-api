import { AppError } from './AppError';

class EntityAlreadyExistsException extends AppError {
  constructor(entity: string) {
    super(`${entity} already exists!`);
  }
}

export { EntityAlreadyExistsException };

import { v4 } from 'uuid';
import { ITokenProvider } from '@domain/providers/token/models/ITokenProvider';

class UuidProvider implements ITokenProvider {
  generate(): string {
    return v4();
  }
}

export { UuidProvider };

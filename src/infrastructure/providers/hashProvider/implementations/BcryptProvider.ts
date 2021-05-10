import { IHashProvider } from '@domain/providers/hash/models/IHashProvider';
import { hash, compare } from 'bcryptjs';

class BcryptProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}

export { BcryptProvider };

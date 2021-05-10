import { ISignInOptions } from '@domain/providers/jwt/dtos/signInOptions';
import { IJwtProvider } from '@domain/providers/jwt/models/IJwtProvider';
import jwt from 'jsonwebtoken';

class JsonWebTokenProvider implements IJwtProvider {
  sign(
    payload: string | object | Buffer,
    secret: string,
    options?: ISignInOptions,
  ): string {
    return jwt.sign(payload, secret, options);
  }

  verify(token: string, secret: string): string | object {
    return jwt.verify(token, secret);
  }
}

export { JsonWebTokenProvider };

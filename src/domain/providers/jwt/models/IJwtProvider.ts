import { ISignInOptions } from '../dtos/signInOptions';

interface IJwtProvider {
  sign(
    payload: string | object | Buffer,
    secret: string,
    options?: ISignInOptions | undefined,
  ): string;
  verify(token: string, secret: string): string | object;
}

export { IJwtProvider };

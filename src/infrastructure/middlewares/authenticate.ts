import { AppError } from '@domain/errors/AppError';
import { verify } from 'jsonwebtoken';
import { Action } from 'routing-controllers';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const authorization = async (action: Action, _: string[]): Promise<boolean> => {
  const authorizationHeader = action.request.headers.authorization;
  let response = false;
  if (!authorizationHeader) {
    throw new AppError('Access-token Token is missing!', 401);
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const decoded = verify(token, String(process.env.APP_SECRET));

    const { sub } = decoded as TokenPayload;

    action.request.user = {
      id: sub,
    };
    response = true;
  } catch {
    response = false;
    throw new AppError('Access-token is invalid!', 401);
  }

  return response;
};

export { authorization };

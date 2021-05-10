import { NextFunction, Request, Response } from 'express';
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { AppError } from '@domain/errors/AppError';

@Middleware({ type: 'after' })
class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    err: any,
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }

    if (err.errors) {
      return response
        .status(400)
        .json({ status: 'error', message: err.message, errors: err.errors });
    }

    console.log(err);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
}

export { ErrorHandler };

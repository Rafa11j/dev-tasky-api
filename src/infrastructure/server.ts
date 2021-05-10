import 'reflect-metadata';
import './config/env';
import './database';
import './container';
import 'express-async-errors';

import { createExpressServer } from 'routing-controllers';
import { controllers } from './ports/routes';
import { ErrorHandler } from './middlewares/ErrorHandler';
import { authorization } from './middlewares/authenticate';
import { currentUserId } from './middlewares/currentUser';

const server = createExpressServer({
  routePrefix: '/api/v1',
  controllers,
  cors: true,
  validation: true,
  defaultErrorHandler: false,
  middlewares: [ErrorHandler],
  authorizationChecker: authorization,
  currentUserChecker: currentUserId,
});

export { server };

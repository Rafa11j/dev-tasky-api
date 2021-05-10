import { container } from 'tsyringe';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { UsersGateway } from '@infrastructure/typeorm/users/gateway/UsersGateway';

import './providers';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersGateway);

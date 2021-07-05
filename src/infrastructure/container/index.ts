import { container } from 'tsyringe';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { UsersGateway } from '@infrastructure/typeorm/users/gateway/UsersGateway';

import './providers';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { TasksGateway } from '@infrastructure/typeorm/tasks/gateway/TasksGateway';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersGateway);

container.registerSingleton<ITasksRepository>('TasksRepository', TasksGateway);

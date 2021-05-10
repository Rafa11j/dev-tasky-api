import { CreateUserService } from '@application/users/useCases/CreateUserService';
import { FindAllUsersService } from '@application/users/useCases/FindAllUsersService';
import { IUsersResponse } from '@domain/users/models/IUsersResponse';
import { Body, Get, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

import { CreateUserRequest } from '../dtos/users/CreateUserRequest';

@JsonController('/users')
class UserController {
  @Get()
  async list(): Promise<IUsersResponse[]> {
    const service = container.resolve(FindAllUsersService);
    const users = await service.execute();

    return users;
  }

  @Post()
  async create(@Body() createUser: CreateUserRequest): Promise<IUsersResponse> {
    const service = container.resolve(CreateUserService);
    const user = await service.execute(createUser);

    return user;
  }
}

export { UserController };

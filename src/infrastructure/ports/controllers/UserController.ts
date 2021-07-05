import { ChangeUserPasswordService } from '@application/users/useCases/ChangeUserPasswordService';
import { CreateUserService } from '@application/users/useCases/CreateUserService';
import { FindAllUsersService } from '@application/users/useCases/FindAllUsersService';
import { UpdateUserService } from '@application/users/useCases/UpdateUserService';
import { IUsersResponse } from '@domain/users/models/IUsersResponse';
import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
  Put,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { ChangeUserPasswordRequest } from '../dtos/users/ChangeUserPasswordRequest';

import { CreateUserRequest } from '../dtos/users/CreateUserRequest';
import { UpdateUserRequest } from '../dtos/users/UpdateUserRequest';

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

  @Put()
  @Authorized()
  async update(
    @CurrentUser() id: string,
    @Body() update: UpdateUserRequest,
  ): Promise<IUsersResponse> {
    const service = container.resolve(UpdateUserService);
    const user = await service.execute({
      ...update,
      id,
    });

    return user;
  }

  @Put('/change-password')
  @Authorized()
  async changePassword(
    @CurrentUser() id: string,
    @Body() changePassword: ChangeUserPasswordRequest,
  ): Promise<IUsersResponse> {
    const service = container.resolve(ChangeUserPasswordService);
    const user = await service.execute({
      ...changePassword,
      id,
    });

    return user;
  }
}

export { UserController };

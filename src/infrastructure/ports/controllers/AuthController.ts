import { IAuthResponse } from '@application/auth/dtos/IAuthResponse';
import { AuthenticateUserService } from '@application/auth/useCases/AuthenticateUserService';
import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';
import { AuthRequest } from '../dtos/users/AuthRequest';

@JsonController('/auth')
class AuthController {
  @Post()
  async create(@Body() authenticate: AuthRequest): Promise<IAuthResponse> {
    const service = container.resolve(AuthenticateUserService);
    const auth = await service.execute(authenticate);

    return auth;
  }
}

export { AuthController };

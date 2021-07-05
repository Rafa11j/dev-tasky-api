import { AppError } from '@domain/errors/AppError';
import { IHashProvider } from '@domain/providers/hash/models/IHashProvider';
import { IJwtProvider } from '@domain/providers/jwt/models/IJwtProvider';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IAuth } from '../dtos/IAuth';
import { IAuthResponse } from '../dtos/IAuthResponse';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('JwtProvider')
    private jwtProvider: IJwtProvider,
  ) {}

  async execute({ email, password }: IAuth): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User email/password invalid!', 401);
    }

    const passwordCompare = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordCompare) {
      throw new AppError('User email/password invalid!', 401);
    }

    const token = this.jwtProvider.sign({}, String(process.env.APP_SECRET), {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      token: `Bearer ${token}`,
      name: user.name,
      email,
      avatar: user.avatar,
      github: user.github,
    };
  }
}

export { AuthenticateUserService };

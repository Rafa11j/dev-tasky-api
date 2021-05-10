import { EntityAlreadyExistsException } from '@domain/errors/EntityAlreadyExistsException';
import { IHashProvider } from '@domain/providers/hash/models/IHashProvider';
import { ICreateUser } from '@domain/users/models/ICreateUser';
import { IUsersResponse } from '@domain/users/models/IUsersResponse';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    name,
    password,
  }: ICreateUser): Promise<IUsersResponse> {
    const verifyUser = await this.usersRepository.findByEmail(email);

    if (verifyUser) {
      throw new EntityAlreadyExistsException('User');
    }

    const passwordHash = await this.hashProvider.hash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserService };

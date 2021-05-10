import { IUsersResponse } from '@domain/users/models/IUsersResponse';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<IUsersResponse[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export { FindAllUsersService };

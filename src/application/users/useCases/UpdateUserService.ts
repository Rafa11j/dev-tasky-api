import { AppError } from '@domain/errors/AppError';
import { EntityNotFoundException } from '@domain/errors/EntityNotFoundException';
import { IUsersResponse } from '@domain/users/models/IUsersResponse';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { githubApi } from '@infrastructure/services/github';
import { inject, injectable } from 'tsyringe';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    email,
    name,
    github,
  }: IUpdateUserDTO): Promise<IUsersResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    const verifyUserEmail = await this.usersRepository.findByEmail(email);

    if (verifyUserEmail && verifyUserEmail.id !== id) {
      throw new AppError('Email already used');
    }

    let avatar = '';

    if (github) {
      try {
        const response = await githubApi.get(`/users/${github}`);
        avatar = response.data.avatar_url;
      } catch {
        throw new AppError('Github user not found!');
        avatar = '';
      }
    }

    user.name = name;
    user.email = email;
    user.github = github;
    user.avatar = avatar;

    await this.usersRepository.update(user);

    return user;
  }
}

export { UpdateUserService };

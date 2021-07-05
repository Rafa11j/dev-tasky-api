import { AppError } from '@domain/errors/AppError';
import { EntityNotFoundException } from '@domain/errors/EntityNotFoundException';
import { IHashProvider } from '@domain/providers/hash/models/IHashProvider';
import { IUsersResponse } from '@domain/users/models/IUsersResponse';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO';

@injectable()
class ChangeUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    id,
    oldPassword,
    password,
    confirmPassword,
  }: IChangeUserPasswordDTO): Promise<IUsersResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    if (password !== confirmPassword) {
      throw new AppError('Password and Password Confirmation are different.');
    }

    const oldPasswordMatch = await this.hashProvider.compare(
      oldPassword,
      user.password,
    );

    if (!oldPasswordMatch) {
      throw new AppError('Failed to change password.');
    }

    const newPasswordHash = await this.hashProvider.hash(password);

    user.password = newPasswordHash;

    await this.usersRepository.update(user);

    return user;
  }
}

export { ChangeUserPasswordService };

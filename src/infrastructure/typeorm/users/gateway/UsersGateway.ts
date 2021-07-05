import { ICreateUser } from '@domain/users/models/ICreateUser';
import { IUser } from '@domain/users/models/IUser';
import { IUsersResponse } from '@domain/users/models/IUsersResponse';
import { IUsersRepository } from '@domain/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

class UsersGateway implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findAll(): Promise<IUsersResponse[]> {
    const users = await this.ormRepository.find();

    return this.toDomainList(users);
  }

  async findById(id: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne(id);

    return this.toDomainFind(user);
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  async create({
    name,
    email,
    password,
  }: ICreateUser): Promise<IUsersResponse> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);
    return this.toDomain(user);
  }

  async update(user: IUser): Promise<IUsersResponse> {
    const userUpdated = await this.ormRepository.save(user);
    return this.toDomain(userUpdated);
  }

  toDomainList(users: User[]): IUsersResponse[] {
    return users.map(({ id, name, email }) => ({
      id,
      name,
      email,
    }));
  }

  toDomain({ id, name, email, avatar, github }: User): IUsersResponse {
    return {
      id,
      email,
      name,
      avatar,
      github,
    };
  }

  toDomainFind(user: User | undefined): IUser | undefined {
    if (!user) {
      return undefined;
    }
    const { id, name, email, github, password, avatar } = user;
    return {
      id,
      name,
      email,
      github,
      password,
      avatar,
    };
  }
}

export { UsersGateway };

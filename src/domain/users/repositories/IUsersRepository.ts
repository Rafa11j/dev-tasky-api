import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';
import { IUsersResponse } from '../models/IUsersResponse';

interface IUsersRepository {
  findAll(): Promise<IUsersResponse[]>;
  findById(id: string): Promise<IUsersResponse | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(createUser: ICreateUser): Promise<IUsersResponse>;
  update(user: IUser): Promise<IUsersResponse>;
}

export { IUsersRepository };

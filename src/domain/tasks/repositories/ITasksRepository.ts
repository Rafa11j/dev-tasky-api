import { ICreateTask } from '../models/ICreateTask';
import { ITask } from '../models/ITask';

export interface ITasksRepository {
  findAllByUser(user_id: string): Promise<ITask[]>;
  findById(id: string): Promise<ITask | undefined>;
  create(data: ICreateTask): Promise<ITask>;
  update(task: ITask): Promise<ITask>;
  delete(id: string): Promise<boolean>;
}

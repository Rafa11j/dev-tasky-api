import { ICreateTask } from '@domain/tasks/models/ICreateTask';
import { ITask } from '@domain/tasks/models/ITask';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { Repository, getRepository } from 'typeorm';
import { Task } from '../entities/Task';

export class TasksGateway implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  async findAllByUser(user_id: string): Promise<ITask[]> {
    const tasks = await this.ormRepository.find({
      where: { user_id },
      order: { name: 'ASC', created_at: 'ASC', priority: 'ASC' },
    });

    return tasks;
  }

  async findById(id: string): Promise<ITask | undefined> {
    const task = await this.ormRepository.findOne(id);

    return task;
  }

  async create({
    description,
    end_date,
    name,
    priority,
    status,
    user_id,
  }: ICreateTask): Promise<ITask> {
    const task = this.ormRepository.create({
      description,
      end_date,
      name,
      priority,
      status,
      user_id,
    });

    await this.ormRepository.save(task);
    return task;
  }

  async update(task: ITask): Promise<ITask> {
    await this.ormRepository.save(task);
    return task;
  }

  async delete(id: string): Promise<boolean> {
    const taskDeleted = await this.ormRepository.softDelete(id);
    return !!taskDeleted.affected;
  }
}

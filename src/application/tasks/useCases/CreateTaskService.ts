import { TaskStatus } from '@domain/tasks/enum/taskStatus';
import { ITask } from '@domain/tasks/models/ITask';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { inject, injectable } from 'tsyringe';
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';

@injectable()
export class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    description,
    end_date,
    name,
    priority,
    user_id,
  }: ICreateTaskDTO): Promise<ITask> {
    const task = await this.tasksRepository.create({
      description,
      end_date,
      name,
      priority,
      user_id,
      status: TaskStatus.OPEN,
    });

    return task;
  }
}

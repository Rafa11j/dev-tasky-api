import { ITask } from '@domain/tasks/models/ITask';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(user_id: string): Promise<ITask[]> {
    const tasks = await this.tasksRepository.findAllByUser(user_id);

    return tasks;
  }
}

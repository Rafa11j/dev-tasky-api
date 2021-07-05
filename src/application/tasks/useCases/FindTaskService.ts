import { EntityNotFoundException } from '@domain/errors/EntityNotFoundException';
import { ITask } from '@domain/tasks/models/ITask';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string): Promise<ITask> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new EntityNotFoundException('Task');
    }

    return task;
  }
}

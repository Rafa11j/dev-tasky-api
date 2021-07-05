import { EntityNotFoundException } from '@domain/errors/EntityNotFoundException';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new EntityNotFoundException('Task');
    }

    const taskDeleted = await this.tasksRepository.delete(id);

    return taskDeleted;
  }
}

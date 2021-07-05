import { EntityNotFoundException } from '@domain/errors/EntityNotFoundException';
import { ITask } from '@domain/tasks/models/ITask';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { inject, injectable } from 'tsyringe';
import { IChangeTaskStatusDTO } from '../dtos/IChangeTaskStatusDTO';

@injectable()
export class ChangeTaskStatusService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ id, status }: IChangeTaskStatusDTO): Promise<ITask> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new EntityNotFoundException('Task');
    }

    task.status = status;

    await this.tasksRepository.update(task);

    return task;
  }
}

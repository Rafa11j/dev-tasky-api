import { TaskStatus } from '@domain/tasks/enum/taskStatus';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { inject, injectable } from 'tsyringe';
import { IShowStatisticsTaskDTO } from '../dtos/IShowStatisticsTaskDTO';

@injectable()
export class ShowStatisticsService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(user_id: string): Promise<IShowStatisticsTaskDTO> {
    const tasks = await this.tasksRepository.findAllByUser(user_id);

    const finished = tasks.filter(task => task.status === TaskStatus.FINISHED)
      .length;

    const open = tasks.filter(task => task.status === TaskStatus.OPEN).length;

    const in_progress = tasks.filter(
      task => task.status === TaskStatus.IN_PROGRESS,
    ).length;

    return {
      finished,
      in_progress,
      open,
    };
  }
}

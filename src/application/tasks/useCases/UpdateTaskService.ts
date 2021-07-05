import { EntityNotFoundException } from '@domain/errors/EntityNotFoundException';
import { ITask } from '@domain/tasks/models/ITask';
import { ITasksRepository } from '@domain/tasks/repositories/ITasksRepository';
import { inject, injectable } from 'tsyringe';
import { IUpdateTaskDTO } from '../dtos/IUpdateTaskDTO';

@injectable()
export class UpdateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    id,
    description,
    end_date,
    name,
    priority,
  }: IUpdateTaskDTO): Promise<ITask> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new EntityNotFoundException('Task');
    }

    task.name = name;
    task.description = description;
    task.end_date = end_date;
    task.priority = priority;

    await this.tasksRepository.update(task);

    return task;
  }
}

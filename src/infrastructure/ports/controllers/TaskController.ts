import { IShowStatisticsTaskDTO } from '@application/tasks/dtos/IShowStatisticsTaskDTO';
import { ChangeTaskStatusService } from '@application/tasks/useCases/ChangeTaskStatusService';
import { CreateTaskService } from '@application/tasks/useCases/CreateTaskService';
import { DeleteTaskService } from '@application/tasks/useCases/DeleteTaskService';
import { FindTaskService } from '@application/tasks/useCases/FindTaskService';
import { ListTasksService } from '@application/tasks/useCases/ListTasksService';
import { ShowStatisticsService } from '@application/tasks/useCases/ShowStatisticsService';
import { UpdateTaskService } from '@application/tasks/useCases/UpdateTaskService';
import { ITask } from '@domain/tasks/models/ITask';
import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Patch,
  Post,
  Put,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { ChangeTaskStatusRequest } from '../dtos/tasks/ChangeTaskStatusRequest';
import { CreateTaskRequest } from '../dtos/tasks/CreateTaskRequest';

@JsonController('/tasks')
@Authorized()
class TaskController {
  @Get()
  async list(@CurrentUser() user_id: string): Promise<ITask[]> {
    const service = container.resolve(ListTasksService);
    const tasks = await service.execute(user_id);

    return tasks;
  }

  @Get('/:id')
  async find(@Param('id') id: string): Promise<ITask> {
    const service = container.resolve(FindTaskService);
    const task = await service.execute(id);

    return task;
  }

  @Get('/statistics')
  async statistics(
    @CurrentUser() user_id: string,
  ): Promise<IShowStatisticsTaskDTO> {
    const service = container.resolve(ShowStatisticsService);
    const statistics = await service.execute(user_id);

    return statistics;
  }

  @Post()
  @HttpCode(201)
  async create(
    @CurrentUser() user_id: string,
    @Body() data: CreateTaskRequest,
  ): Promise<ITask> {
    const service = container.resolve(CreateTaskService);
    const task = await service.execute({
      ...data,
      user_id,
    });

    return task;
  }

  @Patch('/:id')
  async changeStatus(
    @Param('id') id: string,
    @Body() data: ChangeTaskStatusRequest,
  ): Promise<ITask> {
    const service = container.resolve(ChangeTaskStatusService);
    const task = await service.execute({ id, status: data.status });

    return task;
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: CreateTaskRequest,
  ): Promise<ITask> {
    const service = container.resolve(UpdateTaskService);
    const task = await service.execute({
      ...data,
      id,
    });

    return task;
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<boolean> {
    const service = container.resolve(DeleteTaskService);
    const task = await service.execute(id);

    return task;
  }
}

export { TaskController };

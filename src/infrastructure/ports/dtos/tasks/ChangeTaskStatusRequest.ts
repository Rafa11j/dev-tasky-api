import { TaskStatus } from '@domain/tasks/enum/taskStatus';
import { IsNotEmpty } from 'class-validator';

class ChangeTaskStatusRequest {
  @IsNotEmpty()
  status: TaskStatus;
}

export { ChangeTaskStatusRequest };

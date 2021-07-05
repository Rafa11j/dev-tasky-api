import { TaskStatus } from '@domain/tasks/enum/taskStatus';

export interface IChangeTaskStatusDTO {
  id: string;
  status: TaskStatus;
}

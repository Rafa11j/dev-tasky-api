import { TaskPriorityType } from '@domain/tasks/types/taskPriority';

export interface IUpdateTaskDTO {
  id: string;
  name: string;
  end_date: Date;
  description: string;
  priority: TaskPriorityType;
}

import { TaskPriorityType } from '@domain/tasks/types/taskPriority';

export interface ICreateTaskDTO {
  name: string;
  end_date: Date;
  description: string;
  priority: TaskPriorityType;
  user_id: string;
}

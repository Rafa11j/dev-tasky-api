import { TaskStatus } from '../enum/taskStatus';
import { TaskPriorityType } from '../types/taskPriority';

export interface ICreateTask {
  name: string;
  end_date: Date;
  description: string;
  priority: TaskPriorityType;
  status: TaskStatus;
  user_id: string;
}

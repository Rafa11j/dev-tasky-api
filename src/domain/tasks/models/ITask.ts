import { TaskStatus } from '../enum/taskStatus';
import { TaskPriorityType } from '../types/taskPriority';

export interface ITask {
  id: string;
  name: string;
  end_date: Date;
  description: string;
  priority: TaskPriorityType;
  status: TaskStatus;
  user_id: string;
}

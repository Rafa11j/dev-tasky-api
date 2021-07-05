import { TaskPriorityType } from '@domain/tasks/types/taskPriority';
import { IsIn, IsNotEmpty } from 'class-validator';

class CreateTaskRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  description: string;

  @IsIn(['low', 'medium', 'hight'])
  priority: TaskPriorityType;
}

export { CreateTaskRequest };

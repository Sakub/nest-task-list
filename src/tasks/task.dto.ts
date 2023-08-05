import { ITask } from './task.model';
import { IsNotEmpty } from 'class-validator';

export class TaskDto implements ITask {
  id: number;
  @IsNotEmpty() completed: boolean;
  @IsNotEmpty() title: string;
  @IsNotEmpty() user: number;
}

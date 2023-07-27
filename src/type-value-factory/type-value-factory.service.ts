import { Injectable } from '@nestjs/common';
import { ITask } from '../tasks/task.model';

@Injectable()
export class TypeValueFactoryService {
  public static createTask(): ITask {
    return {
      id: 0,
      completed: false,
      title: '',
      userId: 0,
    };
  }
}

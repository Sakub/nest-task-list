import { Injectable } from '@nestjs/common';
import { ITask } from '../tasks/task.model';
import { IUser } from '../users/user.model';

@Injectable()
export class TypeValueFactoryService {
  public static createTask(): ITask {
    return {
      id: 0,
      completed: false,
      title: '',
      user: 0,
    };
  }

  public static createUser(): IUser {
    return {
      email: 'amazingjohn@domain.com',
      id: 0,
      nickname: 'Amazing John',
      password: '$2y$10$GpQCYinfBIyF9zeSbg9F0es93X8oX0pIBwBOj6c6x57GIAUGTgb2C',
      username: 'johndoe332',
    };
  }
}

import { Injectable } from '@nestjs/common';
import { IUser } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  public users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  findAll(): IUser[] {
    return this.users.getValue();
  }

  findOne(id: number): IUser {
    return this.users.getValue().find((user) => user.id === id);
  }

  public update(id: number, body: UpdateUserDto) {
    let userToReturn: IUser;
    this.users.next(
      this.users.getValue().map((user) => {
        if (user.id === id) {
          userToReturn = {
            ...body,
            id,
            password: user.password,
            username: user.username,
          };
          return userToReturn;
        }
        return user;
      }),
    );
    return userToReturn;
  }

  delete(id: number) {
    this.users.next(this.users.getValue().filter((user) => user.id !== id));
  }
}

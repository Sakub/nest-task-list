import { User } from './user.entity';
import { UpdateUserDto } from './user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  nickname: string;
}

export interface IUserService {
  findAll(): Promise<User[]>;

  findOne(id: number): Promise<User | undefined>;

  update(id: number, body: UpdateUserDto): Promise<UpdateResult>;

  delete(id: number): Promise<DeleteResult>;
}

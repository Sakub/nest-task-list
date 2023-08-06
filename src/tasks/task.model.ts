import { Task } from './task.entity';
import { TaskDto } from './task.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

export interface ITask {
  id: number;
  user: number;
  title: string;
  completed: boolean;
}

export interface ITaskService {
  findAll(): Promise<Task[]>;

  findOne(id: number): Promise<Task | undefined>;

  update(id: number, body: TaskDto): Promise<UpdateResult>;

  create(body: TaskDto): Promise<InsertResult>;

  delete(id: number): Promise<DeleteResult>;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private _repository: Repository<Task>) {}

  public findAll(): Promise<Task[]> {
    return this._repository.find();
  }

  public findOne(id: number): Promise<Task | undefined> {
    return this._repository.findOneBy({ id });
  }

  public async create(task: TaskDto): Promise<InsertResult> {
    return this._repository.insert(task);
  }

  public update(id: number, body: TaskDto): Promise<UpdateResult> {
    return this._repository.update({ id }, body);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this._repository.delete({ id });
  }
}

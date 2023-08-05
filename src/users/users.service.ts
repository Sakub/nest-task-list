import { Injectable } from '@nestjs/common';
import { IUserService } from './user.model';
import { UpdateUserDto } from './user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  public findAll(): Promise<User[]> {
    return this.repository.find();
  }

  public findOne(id: number): Promise<User | undefined> {
    return this.repository.findOneBy({ id });
  }

  public update(id: number, body: UpdateUserDto): Promise<UpdateResult> {
    return this.repository.update(id, body);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

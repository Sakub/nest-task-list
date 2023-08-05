import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { TaskDto } from './task.dto';
import { TasksService } from './tasks.service';
import { ILogger } from '../logger/logger.model';
import { Task } from './task.entity';
import {
  DeleteResult,
  InsertResult,
  QueryFailedError,
  UpdateResult,
} from 'typeorm';
import { InvalidForeignKeyException } from '../exceptions/InvalidForeignKeyException';

@Controller('tasks')
export class TasksController {
  constructor(
    private _service: TasksService,
    @Inject('ConsoleLogger') private _logger: ILogger,
  ) {}
  @Get()
  public async getAll(): Promise<Task[]> {
    return await this._service.findAll();
  }

  @Get(':id')
  public async getSingle(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Task | undefined> {
    const task = await this._service.findOne(id);
    if (!task) {
      this._logger.error(`Tried to get task with id: ${id}`);
      throw new NotFoundException();
    }
    return task;
  }

  @Post()
  public async create(@Body() body: TaskDto): Promise<InsertResult> {
    try {
      return await this._service.create(body);
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        e.message.includes('foreign key constraint fails')
      ) {
        this._logger.error(
          `Tried to assign task to user which does not exist, user id: ${body.user}`,
        );
        throw new InvalidForeignKeyException('user');
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  public async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: TaskDto,
  ): Promise<UpdateResult> {
    const result = await this._service.update(id, body);
    if (result.affected === 0) throw new NotFoundException();
    return result;
  }

  @Delete(':id')
  public async delete(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DeleteResult> {
    const result = await this._service.delete(id);
    if (result.affected === 0) throw new NotFoundException();
    return result;
  }
}

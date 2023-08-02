import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ITask } from './task.model';
import { TaskDto } from './task.dto';
import { TasksService } from './tasks.service';
import { ILogger } from '../logger/logger.model';

@Controller('tasks')
export class TasksController {
  constructor(
    private _service: TasksService,
    @Inject('ConsoleLogger') private _logger: ILogger,
  ) {}
  @Get()
  public getAll() {
    return this._service.findAll();
  }

  @Get(':id')
  public getSingle(@Param('id', new ParseIntPipe()) id: number): ITask {
    const task = this._service.findOne(id);
    if (!task) {
      this._logger.error(`Tried to get task with id: ${id}`);
      throw new NotFoundException();
    }
    return task;
  }

  @Post()
  public create(@Body() body: TaskDto): ITask {
    return this._service.pushNew(body);
  }

  @Put(':id')
  public update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: TaskDto,
  ): ITask {
    this.getSingle(id);
    return this._service.update(id, body);
  }

  @Delete(':id')
  public delete(@Param('id', new ParseIntPipe()) id: number) {
    this.getSingle(id);
    this._service.delete(id);
  }
}

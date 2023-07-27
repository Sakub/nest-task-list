import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';
import { TypeValueFactoryService } from '../type-value-factory/type-value-factory.service';

@Controller('tasks')
export class TasksController {
  constructor(private _service: TasksService) {}
  @Get()
  public getAll() {
    return this._service.findAll();
  }

  @Get(':id')
  public getSingle(@Param('id') id: number): ITask {
    const task = this._service.findOne(id);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Post()
  public create(@Body() body: ITask): ITask {
    // creating mock task for now
    const newTask = TypeValueFactoryService.createTask();
    this._service.pushNew(newTask);
    return newTask;
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() body: ITask): ITask {
    this.getSingle(id);
    return this._service.update(id, body);
  }

  @Delete(':id')
  public delete(@Param('id') id: number) {
    this.getSingle(id);
    this._service.delete(id);
  }
}

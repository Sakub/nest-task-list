import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeValueFactoryService } from '../type-value-factory/type-value-factory.service';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw an exception if user tries to find non-existing task', () => {
    expect(() => controller.getSingle(99)).toThrow(NotFoundException);
  });

  it('should throw an exception if user tries to delete non-existing task', () => {
    expect(() => controller.delete(99)).toThrow(NotFoundException);
  });

  it('should throw an exception if user tries to update non-existing task', () => {
    expect(() =>
      controller.update(99, TypeValueFactoryService.createTask()),
    ).toThrow(NotFoundException);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeValueFactoryService } from '../type-value-factory/type-value-factory.service';
import { MockServiceFactoryService } from '../mock-service-factory/mock-service-factory.service';
import { QueryFailedError } from 'typeorm';
import { InvalidForeignKeyException } from '../exceptions/InvalidForeignKeyException';
import { ConsoleLoggerService } from '../logger/console-logger/console-logger.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let logger: ConsoleLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: 'ConsoleLogger',
          useValue: MockServiceFactoryService.createMockLoggerService(),
        },
        {
          provide: TasksService,
          useValue: MockServiceFactoryService.createMockTaskService(),
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
    logger = module.get<ConsoleLoggerService>('ConsoleLogger');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw an exception if user tries to find non-existing task', async () => {
    (service.findOne as jest.Mock).mockResolvedValue(undefined);
    await expect(() => controller.getSingle(99)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw an exception if user tries to delete non-existing task', async () => {
    (service.delete as jest.Mock).mockResolvedValue({ affected: 0 });
    await expect(() => controller.delete(99)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw an exception if user tries to update non-existing task', async () => {
    (service.update as jest.Mock).mockResolvedValue({ affected: 0 });
    await expect(() =>
      controller.update(99, TypeValueFactoryService.createTask()),
    ).rejects.toThrow(NotFoundException);
  });

  describe('Test POST endpoint', () => {
    it('should throw invalid foreign key error if user tries to assign task to non-existing user', async () => {
      (service.create as jest.Mock).mockRejectedValue(
        new QueryFailedError('', [], 'foreign key constraint fails'),
      );
      jest.spyOn(logger, 'error');
      await expect(
        controller.create(TypeValueFactoryService.createTask()),
      ).rejects.toThrow(InvalidForeignKeyException);
      expect(logger.error).toBeCalled();
    });

    it('should throw internal server error if service throws any unhandled errors', async () => {
      (service.create as jest.Mock).mockRejectedValue(new Error());
      jest.spyOn(logger, 'error');
      await expect(
        controller.create(TypeValueFactoryService.createTask()),
      ).rejects.toThrow(InternalServerErrorException);
      expect(logger.error).toBeCalled();
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});

import { Injectable } from '@nestjs/common';
import { ILogger } from '../logger/logger.model';
import { IUserService } from '../users/user.model';
import { ITaskService } from '../tasks/task.model';

@Injectable()
export class MockServiceFactoryService {
  public static createMockLoggerService(): ILogger {
    return {
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
    };
  }

  public static createMockUserService(): IUserService {
    return {
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
      findAll: jest.fn().mockResolvedValue([]),
      update: jest.fn().mockResolvedValue({ affected: 0 }),
      findOne: jest.fn().mockResolvedValue({ affected: 0 }),
    };
  }

  public static createMockTaskService(): ITaskService {
    return {
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
      findAll: jest.fn().mockResolvedValue([]),
      update: jest.fn().mockResolvedValue({ affected: 0 }),
      findOne: jest.fn().mockResolvedValue({ affected: 0 }),
      create: jest.fn().mockResolvedValue({ affected: 0 }),
    };
  }

  public static createMockRepository() {
    return {
      delete: jest.fn(),
      find: jest.fn(),
      findBy: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      insert: jest.fn(),
    };
  }
}

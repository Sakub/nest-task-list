import { Injectable } from '@nestjs/common';
import { ILogger } from '../logger/logger.model';

@Injectable()
export class MockServiceFactoryService {
  public static createMockLoggerService(): ILogger {
    return {
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
    };
  }
}

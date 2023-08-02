import { Test, TestingModule } from '@nestjs/testing';
import { MockServiceFactoryService } from './mock-service-factory.service';

describe('MockServiceFactoryService', () => {
  let service: MockServiceFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockServiceFactoryService],
    }).compile();

    service = module.get<MockServiceFactoryService>(MockServiceFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

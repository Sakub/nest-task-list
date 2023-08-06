import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TypeValueFactoryService } from '../type-value-factory/type-value-factory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { MockServiceFactoryService } from '../mock-service-factory/mock-service-factory.service';

describe('TasksService', () => {
  let service: TasksService;
  const repository = MockServiceFactoryService.createMockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: repository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return task if task with provided if was found', async () => {
      repository.findOneBy.mockResolvedValue(
        TypeValueFactoryService.createTask(),
      );
      const task = await service.findOne(0);
      expect(task).toBeTruthy();
    });

    it('should return undefined if task with provided id was not found', async () => {
      const task = await service.findOne(99);
      expect(task).toBe(undefined);
    });
  });

  describe('create', () => {
    it('repository.insert should be called with valid parameter', () => {
      const payload = TypeValueFactoryService.createTask();
      service.create(payload);
      expect(repository.insert).toBeCalledWith(payload);
    });
  });

  describe('update', () => {
    it('repository.update should be called with valid parameters', () => {
      const payload = TypeValueFactoryService.createTask();
      service.update(0, payload);
      expect(repository.update).toBeCalledWith({ id: 0 }, payload);
    });
  });

  describe('delete', () => {
    it('repository.delete should be called with valid parameter', () => {
      service.delete(0);
      expect(repository.delete).toBeCalledWith({ id: 0 });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

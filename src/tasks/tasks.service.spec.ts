import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TypeValueFactoryService } from '../type-value-factory/type-value-factory.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    service.tasks.next([
      TypeValueFactoryService.createTask(),
      { ...TypeValueFactoryService.createTask(), id: 1 },
    ]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return valid list of tasks', () => {
      const taskList = service.findAll();
      expect(taskList.length).toBe(2);
      expect(taskList[0]).toStrictEqual(TypeValueFactoryService.createTask());
      expect(taskList[1]).toStrictEqual({
        ...TypeValueFactoryService.createTask(),
        id: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return correct task if task with provided if was found', () => {
      const task = service.findOne(0);
      expect(task).toBeTruthy();
    });

    it('should return undefined if task with provided id was not found', () => {
      const task = service.findOne(99);
      expect(task).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should correctly create and save task into list', () => {
      service.pushNew({
        ...TypeValueFactoryService.createTask(),
        title: 'new task',
      });
      expect(
        service.tasks.getValue().find((task) => task.title === 'new task'),
      ).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should correctly update task title property', () => {
      service.update(0, {
        ...TypeValueFactoryService.createTask(),
        title: 'new_title',
      });
      expect(service.findOne(0).title).toBe('new_title');
    });
  });
});

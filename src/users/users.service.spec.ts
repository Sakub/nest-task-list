import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeValueFactoryService } from '../type-value-factory/type-value-factory.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return undefined if id of not existing user is provided', () => {
      expect(service.findOne(0)).toBe(undefined);
    });

    it('should return user if id of existing user is provided', () => {
      service.users.next([TypeValueFactoryService.createUser()]);
      expect(service.findOne(0)).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should correctly update user', () => {
      service.users.next([TypeValueFactoryService.createUser()]);
      service.update(0, {
        email: 'mail@mail.com',
        nickname: 'updatedNickname',
      });

      expect(service.findOne(0).email).toBe('mail@mail.com');
      expect(service.findOne(0).nickname).toBe('updatedNickname');
    });
  });

  describe('delete', () => {
    it('should correctly delete user', () => {
      service.users.next([TypeValueFactoryService.createUser()]);
      service.delete(0);
      expect(service.findAll()).toStrictEqual([]);
    });
  });
});

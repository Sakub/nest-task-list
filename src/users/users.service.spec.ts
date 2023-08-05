import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MockServiceFactoryService } from '../mock-service-factory/mock-service-factory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './user.dto';

describe('UsersService', () => {
  let service: UsersService;
  const repository = MockServiceFactoryService.createMockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return undefined if id of not existing user is provided', async () => {
      const result = await service.findOne(0);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 0 });
      expect(result).toBe(undefined);
    });

    it('should return user if id of existing user is provided', async () => {
      repository.findOneBy.mockResolvedValue({
        email: '',
        id: 0,
        nickname: '',
        password: '',
        username: '',
      });
      await expect(service.findOne(0)).resolves.toBeTruthy();
    });
  });

  describe('update', () => {
    it('should call repository.update with valid parameters', () => {
      const id = 0;
      const payload: UpdateUserDto = {
        email: 'email@email.com',
        nickname: 'nickname',
      };
      service.update(0, payload);
      expect(repository.update).toHaveBeenCalledWith(id, payload);
    });
  });

  describe('delete', () => {
    it('should call repository.delete with valid id', () => {
      service.delete(0);
      expect(repository.delete).toHaveBeenCalledWith(0);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

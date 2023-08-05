import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './user.dto';
import { validate } from 'class-validator';
import { MockServiceFactoryService } from '../mock-service-factory/mock-service-factory.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'ConsoleLogger',
          useValue: MockServiceFactoryService.createMockLoggerService(),
        },
        {
          provide: UsersService,
          useValue: MockServiceFactoryService.createMockUserService(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw an exception if user tries to find non-existing user', async () => {
    (service.findOne as jest.Mock).mockResolvedValue(null);
    await expect(() => controller.getSingle(99)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw an exception if user tries to delete non-existing user', async () => {
    (service.delete as jest.Mock).mockResolvedValue({ affected: 0 });
    await expect(() => controller.delete(99)).rejects.toThrow(
      NotFoundException,
    );
  });

  describe('update', () => {
    describe('validation', () => {
      it('PUT validation should fail if email is empty', async () => {
        const dtoPayload = plainToInstance(UpdateUserDto, {
          email: '',
          nickname: 'nickname',
        });
        const errors = await validate(dtoPayload);
        expect(errors.length).toBe(1);
        expect(errors[0].property).toBe('email');
      });

      it('PUT validation should fail if email is not a valid email', async () => {
        const dtoPayload = plainToInstance(UpdateUserDto, {
          email: 'not-valid-email',
          nickname: 'nickname',
        });
        const errors = await validate(dtoPayload);
        expect(errors.length).toBe(1);
        expect(errors[0].property).toBe('email');
      });

      it('PUT validation should fail if nickname is empty', async () => {
        const dtoPayload = plainToInstance(UpdateUserDto, {
          email: 'email@email.com',
          nickname: '',
        });
        const errors = await validate(dtoPayload);
        expect(errors.length).toBe(1);
        expect(errors[0].property).toBe('nickname');
      });

      it('PUT validation should fail if both email and nickname are empty', async () => {
        const dtoPayload = plainToInstance(UpdateUserDto, {
          email: '',
          nickname: '',
        });
        const errors = await validate(dtoPayload);
        expect(errors.length).toBe(2);
      });

      it('PUT validation should pass if both email and nickname are valid', async () => {
        const dtoPayload = plainToInstance(UpdateUserDto, {
          email: 'email@email.com',
          nickname: 'nickname',
        });
        const errors = await validate(dtoPayload);
        expect(errors.length).toBe(0);
      });
    });

    it('should throw an exception if user tries to update non-existing user', () => {
      (service.update as jest.Mock).mockResolvedValue({ affected: 0 });
      expect(async () =>
        controller.update(99, {
          email: 'mail@mail.com',
          nickname: 'username',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

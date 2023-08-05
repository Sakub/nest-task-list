import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './user.dto';
import { ILogger } from '../logger/logger.model';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private _service: UsersService,
    @Inject('ConsoleLogger') private _logger: ILogger,
  ) {}

  @Get()
  public async getAll(): Promise<User[]> {
    return await this._service.findAll();
  }

  @Get(':id')
  public async getSingle(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User | undefined> {
    const user = await this._service.findOne(id);
    if (!user) {
      this._logger.error(`Tried to fetch user with id: ${id}`);
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  public async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateResult> {
    const result = await this._service.update(id, body);
    if (result.affected === 0) throw new NotFoundException();
    return result;
  }

  @Delete(':id')
  public async delete(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DeleteResult> {
    const result = await this._service.delete(id);
    if (result.affected === 0) throw new NotFoundException();
    return result;
  }
}

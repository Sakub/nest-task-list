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
import { IUser } from './user.model';
import { UsersService } from './users.service';
import { UpdateUserDto } from './user.dto';
import { ILogger } from '../logger/logger.model';

@Controller('users')
export class UsersController {
  constructor(
    private _service: UsersService,
    @Inject('ConsoleLogger') private _logger: ILogger,
  ) {}

  @Get()
  public getAll(): IUser[] {
    return this._service.findAll();
  }

  @Get(':id')
  public getSingle(@Param('id', new ParseIntPipe()) id: number): IUser {
    const user = this._service.findOne(id);
    if (!user) {
      this._logger.error(`Tries to fetch user with id: ${id}`);
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  public update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ): IUser {
    this.getSingle(id);
    return this._service.update(id, body);
  }

  @Delete(':id')
  public delete(@Param('id', new ParseIntPipe()) id: number) {
    this.getSingle(id);
    this._service.delete(id);
    return;
  }
}

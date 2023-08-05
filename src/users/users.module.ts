import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Module({
  providers: [UsersService, Repository],
  controllers: [UsersController],
  imports: [LoggerModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}

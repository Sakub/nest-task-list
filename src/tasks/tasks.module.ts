import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Module({
  controllers: [TasksController],
  imports: [LoggerModule, TypeOrmModule.forFeature([Task])],
  providers: [TasksService, Repository],
})
export class TasksModule {}

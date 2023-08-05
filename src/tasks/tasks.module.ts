import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  controllers: [TasksController],
  imports: [LoggerModule, TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
})
export class TasksModule {}

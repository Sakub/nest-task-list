import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  controllers: [TasksController],
  imports: [LoggerModule],
  providers: [TasksService],
})
export class TasksModule {}

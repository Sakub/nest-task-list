import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeValueFactoryService } from './type-value-factory/type-value-factory.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [TasksModule, UsersModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, TypeValueFactoryService],
})
export class AppModule {}

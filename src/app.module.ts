import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeValueFactoryService } from './type-value-factory/type-value-factory.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { MockServiceFactoryService } from './mock-service-factory/mock-service-factory.service';

@Module({
  imports: [TasksModule, UsersModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, TypeValueFactoryService, MockServiceFactoryService],
})
export class AppModule {}

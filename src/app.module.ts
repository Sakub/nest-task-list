import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeValueFactoryService } from './type-value-factory/type-value-factory.service';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService, TypeValueFactoryService],
})
export class AppModule {}

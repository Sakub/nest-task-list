import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeValueFactoryService } from './type-value-factory/type-value-factory.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { MockServiceFactoryService } from './mock-service-factory/mock-service-factory.service';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    UsersModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DATABASE_HOST'),
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASSWORD'),
          port: config.get<number>('DATABASE_PORT'),
          database: config.get<string>('DATABASE_NAME'),
          entities: [User, Task],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TypeValueFactoryService, MockServiceFactoryService],
})
export class AppModule {}

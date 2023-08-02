import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [LoggerModule],
})
export class UsersModule {}

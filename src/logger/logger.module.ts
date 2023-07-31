import { Module } from '@nestjs/common';
import { ConsoleLoggerService } from './console-logger/console-logger.service';
import { FileLoggerService } from './file-logger/file-logger.service';

@Module({
  providers: [ConsoleLoggerService, FileLoggerService],
  exports: [ConsoleLoggerService, FileLoggerService],
})
export class LoggerModule {}

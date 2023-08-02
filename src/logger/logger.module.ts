import { Module } from '@nestjs/common';
import { ConsoleLoggerService } from './console-logger/console-logger.service';
import { FileLoggerService } from './file-logger/file-logger.service';

@Module({
  providers: [
    { provide: 'ConsoleLogger', useClass: ConsoleLoggerService },
    { provide: 'FileLogger', useClass: FileLoggerService },
  ],
  exports: ['ConsoleLogger', 'FileLogger'],
})
export class LoggerModule {}

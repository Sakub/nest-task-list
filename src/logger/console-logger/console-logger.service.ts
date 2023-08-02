import { Injectable } from '@nestjs/common';
import { ILogger, LogType } from '../logger.model';

@Injectable()
export class ConsoleLoggerService implements ILogger {
  private _getDate(): string {
    return new Date().toLocaleString('en-US').split(', ').join(' ');
  }

  private _log(logType: LogType, message: string): void {
    console.log(`[${this._getDate()}] ${logType} - ${message}`);
  }

  public error(message: string): void {
    this._log(LogType.ERROR, message);
  }

  public info(message: string): void {
    this._log(LogType.INFO, message);
  }

  public warning(message: string): void {
    this._log(LogType.WARNING, message);
  }
}

import { Injectable } from '@nestjs/common';
import { ILogger } from '../logger.model';

@Injectable()
export class ConsoleLoggerService implements ILogger {
  private _getDate(): string {
    return new Date().toLocaleString('en-US').split(', ').join(' ');
  }

  error(message: string): void {
    console.log(`[${this._getDate()}] ERROR - ${message}`);
  }

  info(message: string): void {
    console.log(`[${this._getDate()}] INFO - ${message}`);
  }

  warning(message: string): void {
    console.log(`[${this._getDate()}] WARNING - ${message}`);
  }
}

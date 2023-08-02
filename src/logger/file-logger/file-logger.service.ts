import { Injectable } from '@nestjs/common';
import { ILogger, LogType } from '../logger.model';

import * as fs from 'fs/promises';
import * as process from 'process';
import * as path from 'path';

@Injectable()
export class FileLoggerService implements ILogger {
  private _getDate(): string {
    return new Date().toLocaleString('en-US').replace(',', '');
  }

  private _getFileName(): string {
    return new Date().toLocaleDateString('en-US').replace(/\//g, '-');
  }

  public async error(message: string): Promise<void> {
    await this._log(LogType.ERROR, message);
  }

  public async info(message: string): Promise<void> {
    await this._log(LogType.INFO, message);
  }

  public async warning(message: string): Promise<void> {
    await this._log(LogType.WARNING, message);
  }

  private async _log(logType: LogType, message: string): Promise<void> {
    try {
      const logsDirectoryPath = path.join(process.cwd(), 'logs');
      const logPath = path.join(
        logsDirectoryPath,
        `${this._getFileName()}.txt`,
      );
      await fs.mkdir(logsDirectoryPath, { recursive: true });
      await fs.appendFile(
        logPath,
        `[${this._getDate()}] ${logType} ${message} \n`,
      );
    } catch (error) {
      console.log(
        `Error while logging occured: ${error}. Tried to log: "${message}" on ${logType} level.`,
      );
    }
  }
}

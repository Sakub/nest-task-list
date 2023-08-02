export interface ILogger {
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
}

export const enum LogType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

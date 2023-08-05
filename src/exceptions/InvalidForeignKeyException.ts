import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidForeignKeyException extends HttpException {
  constructor(resource: string) {
    super(
      `Resource referenced by given foreign key does not exist, reading: ${resource}`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

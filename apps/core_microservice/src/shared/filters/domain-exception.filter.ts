import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BaseDomainException } from '../exceptions/base-domain.exception.js';
import { NotSufficientPermissionsException } from '../exceptions/not-sufficient-permissions.exception.js';
import { Response } from 'express';

// https://docs.nestjs.com/exception-filters
@Catch(BaseDomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: BaseDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = this.mapToStatusCode(exception);

    response
      .status(statusCode)
      .json({
        status: statusCode,
        message: exception.message
      });
  }

  private mapToStatusCode(excpetion: BaseDomainException): number {
    if (excpetion instanceof NotSufficientPermissionsException)
      return HttpStatus.FORBIDDEN;

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
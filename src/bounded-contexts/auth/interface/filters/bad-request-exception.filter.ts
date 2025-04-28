import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly reflector: Reflector) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const handler = ctx.getRequest().route?.path;

    const customMessage = this.reflector.get('validationErrorMessage', handler);

    const defaultResponse = {
      message: 'Validation failed',
      cause: 'Invalid input data',
    };

    response.status(400).json(customMessage || defaultResponse);
  }
}
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { stack, message } = exception;

    const messageError: any = exception?.getResponse();
    const isMessageErrorArray = Array.isArray(messageError?.message);

    let formattedMsg = '';

    if (isMessageErrorArray) {
      // index of nested error object
      const objectIndex = parseInt(messageError.message[0].match(/\d+/g));
      const isNestedMessage = messageError.message[0].includes(
        `.${objectIndex}.`,
      );
      if (isNestedMessage) {
        const err = messageError.message[0].split(`${objectIndex}`);
        formattedMsg = err[1];
      } else {
        formattedMsg = messageError.message[0];
      }
    }

    const error: any = {
      statusCode: status,
      message: Array.isArray(messageError?.message) ? formattedMsg : message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) error.stack = stack;
    response.status(status).json(error);
  }
}

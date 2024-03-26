import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const cxt = host.switchToHttp();
    const request = cxt.getRequest<Request>();
    const response = cxt.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message ? exception.message : '服务器错误';

    response.status(status).json({
      errno: -1,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

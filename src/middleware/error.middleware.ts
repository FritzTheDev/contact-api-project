import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exception';

export function errorMiddleware(
  // handles any errors thrown by request handler chains
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // If the error hasn't been handled properly, it defaults to a 500 with a basic message
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).json({
    message,
    status
  });
}

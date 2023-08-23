import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errors/http-exception.error';

export function errorMiddleware(
  err: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';

  response.status(status).json({ message });
}

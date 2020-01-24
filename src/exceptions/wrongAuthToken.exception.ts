import { HttpException } from './http.exception';

export class WrongAuthTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}
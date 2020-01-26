import { HttpException } from './http.exception';

export class WrongAuthTokenException extends HttpException {
  // Throws if the auth token is invalid
  constructor() {
    super(401, 'Wrong authentication token');
  }
}
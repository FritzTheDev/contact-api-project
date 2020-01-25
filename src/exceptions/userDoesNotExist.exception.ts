import { HttpException } from "../exceptions/http.exception";

export class UserDoesNotExistException extends HttpException {
  constructor(email: string) {
    super(400, `User with email: ${email} does not exist`);
  }
}
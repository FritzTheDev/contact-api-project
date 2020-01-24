import { HttpException } from "../exceptions/http.exception";

export class UserWithThatEmailExistsException extends HttpException {
  constructor(email: string) {
    super(400, `User with email: ${email} already exists`);
  }
}
import { HttpException } from "../exceptions/http.exception";

export class UserWithThatEmailExistsException extends HttpException {
  // Throws if the user creation attempt uses an email already in use.
  constructor(email: string) {
    super(400, `User with email: ${email} already exists`);
  }
}
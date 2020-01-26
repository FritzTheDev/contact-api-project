import { HttpException } from "../exceptions/http.exception";

export class UserDoesNotExistException extends HttpException {
  // Throws if the login attempt is associated with a user that doesn't exist
  constructor(email: string) {
    super(400, `User with email: ${email} does not exist`);
  }
}
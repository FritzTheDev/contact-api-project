import { HttpException } from "./http.exception";

export class PasswordDoesNotMatchException extends HttpException {
  // Throws if the password supplied does not match
  constructor() {
    super(400, "Password Does Not Match");
  }
}
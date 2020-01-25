import { HttpException } from "./http.exception";

export class PasswordDoesNotMatchException extends HttpException {
  constructor() {
    super(400, "Password Does Not Match");
  }
}
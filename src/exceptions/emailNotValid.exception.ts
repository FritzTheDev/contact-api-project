import { HttpException } from "./http.exception";

export class EmailNotValidException extends HttpException {
  // Throws f email doesn't match the email regex in the auth service.
  constructor(email: string) {
    super(400, `Email ${email} Is Not Valid. Please try again with a valid email`);
  }
}
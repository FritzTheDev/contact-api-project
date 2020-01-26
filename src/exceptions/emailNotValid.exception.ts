import { HttpException } from "./http.exception";

export class EmailNotValidException extends HttpException {
  constructor(email: string) {
    super(400, `Email ${email} Is Not Valid. Please try again with a valid email`);
  }
}
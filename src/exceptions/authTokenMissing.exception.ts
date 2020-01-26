import { HttpException } from "./http.exception";

export class AuthTokenMissingException extends HttpException {
  // Throws if the authentication token isn't present on a request that requires it
  constructor() {
    super(401, "Authentication Token Missing");
  }
}
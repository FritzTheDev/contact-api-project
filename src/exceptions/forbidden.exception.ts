import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
  // Throws if the user tries to access a different user's resource
  constructor() {
    super(403, "You are not authorized to access this resource");
  }
}
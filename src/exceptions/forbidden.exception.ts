import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
  constructor() {
    super(403, "You are not authorized to access this resource");
  }
}
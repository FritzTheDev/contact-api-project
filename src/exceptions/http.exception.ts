// "Base" error class that all the other errors extend from.
// Theoretically could be used on its own but better to use seperate classes
export class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

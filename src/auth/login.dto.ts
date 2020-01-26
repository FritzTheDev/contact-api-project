import { IsString } from "class-validator";

// Used in tandem with validationMiddleware to check request validity
export class LoginDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

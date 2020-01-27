import { IsString } from "class-validator";

// Part of the validation setup; Works with the middleware to validate post requests
export class CreateUserDto {
  @IsString()
  public full_name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

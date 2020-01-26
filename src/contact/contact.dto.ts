import { IsString, IsNumber } from "class-validator";

// used in tandem with validationMiddleware for validation
export class ContactDto {
  @IsString()
  email: string;

  @IsNumber()
  group_id: number;
}
import { IsString, IsNumber } from "class-validator";

export class ContactDto {
  @IsString()
  email: string;

  @IsNumber()
  group_id: number;
}
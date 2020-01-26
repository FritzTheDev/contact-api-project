import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateGroupDto {
  // Used with validationMiddleware to validate data sent over the wire
  @IsString()
  group_name: string;
}
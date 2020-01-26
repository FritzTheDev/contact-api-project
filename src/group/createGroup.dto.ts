import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateGroupDto {
  @IsString()
  group_name: string;
}
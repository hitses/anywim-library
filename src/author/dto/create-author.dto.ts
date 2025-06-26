import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAuthorDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  lastname: string;
}

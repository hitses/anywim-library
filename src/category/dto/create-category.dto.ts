import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  code: string;
}

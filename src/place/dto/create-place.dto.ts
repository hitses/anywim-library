import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePlaceDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string;
}

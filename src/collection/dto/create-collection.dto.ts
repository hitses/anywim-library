import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;
}

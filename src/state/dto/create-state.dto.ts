import { Transform } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsIn(['available', 'loaned', 'reading'], {
    message: 'The state must be: available, loaned or reading',
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string;
}

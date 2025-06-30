import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsMongoId()
  book: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  person: string;
}

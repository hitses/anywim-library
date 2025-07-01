import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ForgetPasswordDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;
}

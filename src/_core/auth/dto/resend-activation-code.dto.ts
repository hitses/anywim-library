import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ResendActivationCodeDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;
}

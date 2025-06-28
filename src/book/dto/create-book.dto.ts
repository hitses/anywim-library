import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsValidIsbn } from 'src/common/validators/isbn';

export class CreateBookDto {
  @IsNotEmpty()
  @IsValidIsbn({
    message: 'The ISBN is invalid. Must be a correct ISBN-10 or ISBN-13.',
  })
  isbn: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Min(1)
  copies: number;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  place: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsMongoId({ each: true })
  authors: string[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsMongoId({ each: true })
  categories: string[];

  @IsOptional()
  @IsString()
  @IsMongoId()
  saga?: string;

  @ValidateIf((obj) => obj.saga != null)
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  order_in_saga?: number;
}

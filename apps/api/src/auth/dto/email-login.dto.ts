import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { lowerCaseTransformer } from '../../common/helpers/transformers/lower-case.transformer';
import { Transform } from 'class-transformer';

export class EmailLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(lowerCaseTransformer)
  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Password@123' })
  readonly password: string;
}

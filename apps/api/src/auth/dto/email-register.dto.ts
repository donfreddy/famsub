import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/helpers';
import { Transform } from 'class-transformer';

export class EmailRegisterDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  @ApiProperty({ type: 'string', example: faker.person.firstName() })
  readonly first_name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  @ApiProperty({ type: 'string', example: faker.person.lastName() })
  readonly last_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: faker.internet.username() })
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @ApiProperty({ type: 'string', example: faker.internet.email() })
  readonly email: string;

  @MinLength(6)
  @MaxLength(100)
  @ApiProperty({ type: 'string', example: faker.internet.password() })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: faker.phone.number() })
  readonly contact_number: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty({ enum: Gender, example: Gender.MALE })
  gender: Gender;

  @IsString()
  @ApiProperty({ type: 'string', example: faker.location.county() })
  readonly country: string;

  @IsString()
  @ApiProperty({ type: 'string', example: faker.date.birthdate() })
  readonly birthdate: string;
}

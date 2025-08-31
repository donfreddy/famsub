import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { Gender, Role } from '../../../common/helpers';

export class UserDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsOptional()
  first_name?: string;

  @IsNotEmpty()
  @IsOptional()
  last_name?: string;

  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  contact_number?: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsOptional()
  country?: string;

  /*constructor(user: User) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.email = user.email;
    this.contact_number = user.contact_number;
    this.gender = user.gender;
    this.role = user.role;
    this.country = user.country;
  }*/
}

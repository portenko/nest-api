import { Type } from 'class-transformer';

import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  lastName: string;

  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Type(() => String)
  @IsString()
  @MinLength(8)
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}.*$/, {
    message:
      'Password must contain: a minimum of 1 uppercase letter, a minimum of 1 lowercase letter, a minimum of 1 numeric character, a minimum of 1 special character and a minimum of 8 characters in length',
  })
  password?: string;

  @Type(() => String)
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  isEmailConfirmed?: boolean = false;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @IsString()
  @IsOptional()
  role?: string = 'user';
}

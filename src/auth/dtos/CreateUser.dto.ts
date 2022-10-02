import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class creatUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MaxLength(32)
  firstName: string;
  @IsNotEmpty()
  @MaxLength(32)
  lastName: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

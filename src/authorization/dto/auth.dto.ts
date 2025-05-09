import { IsEmail, IsString, Length } from 'class-validator';

export class AuthDto {

  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  email: string;

  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Not less than 4 chars and not biggest 16 chars' })
  password: string;
}

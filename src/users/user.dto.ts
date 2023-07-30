import { IUser } from './user.model';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto implements IUser {
  id: number;
  @IsEmail() @IsNotEmpty() email: string;
  @IsNotEmpty() nickname: string;
  @IsStrongPassword() password: string;
  @IsNotEmpty() username: string;
}

export class UpdateUserDto {
  @IsEmail() @IsNotEmpty() email: string;
  @IsNotEmpty() nickname: string;
}

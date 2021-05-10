import { IsEmail, IsNotEmpty } from 'class-validator';

class AuthRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export { AuthRequest };

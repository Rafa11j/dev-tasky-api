import { IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export { CreateUserRequest };

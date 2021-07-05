import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

class UpdateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  github?: string;
}

export { UpdateUserRequest };

import { IsNotEmpty } from 'class-validator';

class ChangeUserPasswordRequest {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}

export { ChangeUserPasswordRequest };

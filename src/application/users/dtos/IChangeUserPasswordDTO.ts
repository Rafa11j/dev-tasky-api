export interface IChangeUserPasswordDTO {
  id: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

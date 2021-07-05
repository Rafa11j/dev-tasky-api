interface IAuthResponse {
  token: string;
  name: string;
  email: string;
  avatar?: string;
  github?: string;
}

export { IAuthResponse };

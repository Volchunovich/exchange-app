export interface OutRegisterDTO {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface OutLoginDTO {
  email: string;
  password: string;
}

export interface InLoginDTO {
  accessToken: string;
  refreshToken: string;
}

export interface InAccessTokenDTO {
  accessToken: string;
}

export interface OutAccessTokenDTO {
  refreshToken: string;
}
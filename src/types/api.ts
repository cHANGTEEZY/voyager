export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name?: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface MessageResponse {
  message: string;
}

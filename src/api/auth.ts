import { api } from "@/lib/api-client";
import type {
  AuthResponse,
  LoginCredentials,
  MessageResponse,
  SignupCredentials,
  User,
} from "@/types/api";

import { ENDPOINTS } from "./endpoints";

export const authApi = {
  login: (payload: LoginCredentials): Promise<AuthResponse> =>
    api.post<AuthResponse, LoginCredentials>(ENDPOINTS.auth.login, payload),

  signup: (payload: SignupCredentials): Promise<AuthResponse> =>
    api.post<AuthResponse, SignupCredentials>(ENDPOINTS.auth.signup, payload),

  logout: (): Promise<MessageResponse> =>
    api.post<MessageResponse>(ENDPOINTS.auth.logout),

  getMe: (): Promise<User> => api.get<User>(ENDPOINTS.auth.getMe),
} as const;

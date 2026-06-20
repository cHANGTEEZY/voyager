export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    getMe: "/auth/me",
  },
} as const;

export type EndpointPath =
  (typeof ENDPOINTS)[keyof typeof ENDPOINTS][keyof (typeof ENDPOINTS)[keyof typeof ENDPOINTS]];

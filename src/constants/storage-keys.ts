export const STORAGE_KEYS = {
  onboardingCompleted: "isOnboardingCompleted",
  themePreference: "themePreference",
} as const;

export type ThemePreference = "light" | "dark" | "system";

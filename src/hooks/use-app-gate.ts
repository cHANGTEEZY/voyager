import { STORAGE_KEYS } from "@/constants/storage-keys";
import { authClient } from "@/lib/auth-client";
import { secureStorage } from "@/lib/utils/secure-store";
import { useEffect, useState } from "react";

export type AppGateDestination =
  | "/(tabs)"
  | "/(onboarding)"
  | "/(auth)/welcome";

export function useAppGate(): AppGateDestination | null {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [onboardingCompleted, setOnboardingCompleted] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    void secureStorage
      .getItem<boolean>(STORAGE_KEYS.onboardingCompleted)
      .then((value) => {
        setOnboardingCompleted(Boolean(value));
      });
  }, []);

  if (isSessionPending || onboardingCompleted === null) {
    return null;
  }

  if (session?.user) {
    return "/(tabs)";
  }

  if (!onboardingCompleted) {
    return "/(onboarding)";
  }

  return "/(auth)/welcome";
}

export async function completeOnboarding(): Promise<void> {
  await secureStorage.setItem(STORAGE_KEYS.onboardingCompleted, true);
}

import { STORAGE_KEYS } from "@/constants/storage-keys";
import { authClient } from "@/lib/auth-client";
import { secureStorage } from "@/lib/secure-store";
import { Redirect } from "expo-router";
import { Spinner } from "heroui-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

export function OnboardingRedirectGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    void secureStorage
      .getItem<boolean>(STORAGE_KEYS.onboardingCompleted)
      .then((value) => {
        setOnboardingCompleted(Boolean(value));
      });
  }, []);

  if (isSessionPending || onboardingCompleted === null) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Spinner size="lg" />
      </View>
    );
  }

  if (session?.user) {
    return <Redirect href="/(tabs)" />;
  }

  if (onboardingCompleted) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return children;
}

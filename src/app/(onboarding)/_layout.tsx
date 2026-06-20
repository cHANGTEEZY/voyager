import { OnboardingRedirectGuard } from "@/components/onboarding/onboarding-redirect-guard";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <OnboardingRedirectGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingRedirectGuard>
  );
}

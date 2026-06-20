import { completeOnboarding } from "@/hooks/use-app-gate";
import { ONBOARDING_SLIDES } from "@/features/onboarding/onboarding-data";
import { OnboardingSlideView } from "@/features/onboarding/components/onboarding-slide-view";
import { router } from "expo-router";
import { Button, Typography } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const slide = ONBOARDING_SLIDES[step];
  const isLastStep = step === ONBOARDING_SLIDES.length - 1;

  const handleNext = async () => {
    if (!isLastStep) {
      setStep((current) => current + 1);
      return;
    }

    await completeOnboarding();
    router.replace("/(auth)/welcome");
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace("/(auth)/welcome");
  };

  if (!slide) {
    return null;
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingBottom: insets.bottom + 16 }}>
      <View
        className="flex-row items-center justify-between px-6"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Typography.Heading type="h4" weight="bold" className="text-accent">
          Voyager
        </Typography.Heading>
        <Button variant="ghost" size="sm" onPress={handleSkip}>
          <Button.Label>Skip</Button.Label>
        </Button>
      </View>

      <OnboardingSlideView slide={slide} />

      <View className="gap-6 px-6">
        <View className="flex-row items-center justify-center gap-2">
          {ONBOARDING_SLIDES.map((item, index) => (
            <View
              key={item.id}
              className={`h-2 rounded-full ${
                index === step ? "w-8 bg-accent" : "w-2 bg-border"
              }`}
            />
          ))}
        </View>

        <Button size="lg" className="w-full" onPress={handleNext}>
          <Button.Label>{isLastStep ? "Get Started" : "Continue"}</Button.Label>
        </Button>
      </View>
    </View>
  );
}

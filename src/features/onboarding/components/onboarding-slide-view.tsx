import { Button, Typography } from "heroui-native";
import { View } from "react-native";

import type { OnboardingSlide } from "@/features/onboarding/onboarding-data";

type OnboardingSlideViewProps = {
  slide: OnboardingSlide;
};

export function OnboardingSlideView({ slide }: OnboardingSlideViewProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="mb-8 h-28 w-28 items-center justify-center rounded-full bg-accent-soft">
        <Typography.Heading type="h1">{slide.emoji}</Typography.Heading>
      </View>
      <Typography.Heading type="h2" align="center" weight="bold" className="mb-3 text-foreground">
        {slide.title}
      </Typography.Heading>
      <Typography.Paragraph align="center" color="muted" className="max-w-sm">
        {slide.description}
      </Typography.Paragraph>
    </View>
  );
}

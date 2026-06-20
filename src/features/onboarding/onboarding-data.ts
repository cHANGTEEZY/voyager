export type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "capture",
    title: "Capture the Journey",
    description:
      "Document every peak, trail, and sunset with rich travel stories.",
    emoji: "📸",
  },
  {
    id: "share",
    title: "Share Your Adventures",
    description:
      "Turn your trips into unforgettable stories your friends can follow.",
    emoji: "🌍",
  },
  {
    id: "explore",
    title: "Explore Together",
    description:
      "Discover routes, save favorites, and plan your next voyage with ease.",
    emoji: "🧭",
  },
];

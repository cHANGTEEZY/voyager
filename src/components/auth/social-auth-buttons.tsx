import { authClient } from "@/lib/auth-client";
import AppleIcon from "@hugeicons/core-free-icons/AppleIcon";
import GoogleIcon from "@hugeicons/core-free-icons/GoogleIcon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Button, Spinner } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

type SocialProvider = "google" | "apple";

type SocialAuthButtonsProps = {
  mode: "sign-in" | "sign-up";
  onUnavailable?: () => void;
};

const PROVIDERS: Array<{
  id: SocialProvider;
  label: string;
  icon: typeof GoogleIcon;
}> = [
  { id: "google", label: "Google", icon: GoogleIcon },
  { id: "apple", label: "Apple", icon: AppleIcon },
];

export function SocialAuthButtons({ onUnavailable }: SocialAuthButtonsProps) {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingApple, setIsLoadingApple] = useState(false);
  const foregroundColor = useCSSVariable("--foreground");
  const iconColor =
    typeof foregroundColor === "string" ? foregroundColor : "#111827";

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
      });
      if (error) {
        throw error;
      }
    } catch (caughtError: unknown) {
      console.log("Google sign-in error:", caughtError);
      if (
        typeof caughtError === "object" &&
        caughtError !== null &&
        "status" in caughtError
      ) {
        console.error(
          `Auth request failed with HTTP ${(caughtError as { status: number }).status}`,
        );
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleProviderPress = (provider: SocialProvider) => {
    if (provider === "google") {
      void handleGoogleSignIn();
      return;
    }

    onUnavailable?.();
  };

  const isBusy = isLoadingGoogle || isLoadingApple;

  return (
    <View className="gap-3">
      {PROVIDERS.map((provider) => {
        const isLoading =
          provider.id === "google" ? isLoadingGoogle : isLoadingApple;

        return (
          <Button
            key={provider.id}
            variant="outline"
            size="lg"
            className="w-full"
            onPress={() => handleProviderPress(provider.id)}
            isDisabled={isBusy}
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <HugeiconsIcon
                  icon={provider.icon}
                  size={20}
                  color={iconColor}
                  strokeWidth={1.5}
                />
                <Button.Label>{provider.label}</Button.Label>
              </>
            )}
          </Button>
        );
      })}
    </View>
  );
}

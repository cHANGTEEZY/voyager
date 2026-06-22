import AppleIcon from "@hugeicons/core-free-icons/AppleIcon";
import GoogleIcon from "@hugeicons/core-free-icons/GoogleIcon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Button, Spinner } from "heroui-native";
import { View } from "react-native";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

type SocialAuthButtonsProps = {
  mode: "sign-in" | "sign-up";
  onUnavailable?: () => void;
};

export function SocialAuthButtons({ onUnavailable }: SocialAuthButtonsProps) {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingApple, setIsLoadingApple] = useState(false);

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

  return (
    <View className="gap-3">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onPress={handleGoogleSignIn}
        isDisabled={isLoadingGoogle || isLoadingApple}
      >
        {isLoadingGoogle ? (
          <Spinner size="sm" color="white" />
        ) : (
          <>
            <HugeiconsIcon
              icon={GoogleIcon}
              size={20}
              color="white"
              strokeWidth={1.5}
            />
            <Button.Label>Google</Button.Label>
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onPress={onUnavailable}
        isDisabled={isLoadingApple || isLoadingGoogle}
      >
        {isLoadingApple ? (
          <Spinner size="sm" color="white" />
        ) : (
          <>
            <HugeiconsIcon
              icon={AppleIcon}
              size={20}
              color="white"
              strokeWidth={1.5}
            />
            <Button.Label>Apple</Button.Label>
          </>
        )}
      </Button>
    </View>
  );
}

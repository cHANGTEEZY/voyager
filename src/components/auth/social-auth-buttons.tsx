import AppleIcon from "@hugeicons/core-free-icons/AppleIcon";
import GoogleIcon from "@hugeicons/core-free-icons/GoogleIcon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Button } from "heroui-native";
import { View } from "react-native";

type SocialAuthButtonsProps = {
  mode: "sign-in" | "sign-up";
  onUnavailable?: () => void;
};

export function SocialAuthButtons({ onUnavailable }: SocialAuthButtonsProps) {
  return (
    <View className="gap-3">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onPress={onUnavailable}
      >
        <HugeiconsIcon
          icon={GoogleIcon}
          size={20}
          color="currentColor"
          strokeWidth={1.5}
        />
        <Button.Label>Google</Button.Label>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onPress={onUnavailable}
      >
        <HugeiconsIcon
          icon={AppleIcon}
          size={20}
          color="currentColor"
          strokeWidth={1.5}
        />
        <Button.Label>Apple</Button.Label>
      </Button>
    </View>
  );
}

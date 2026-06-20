import { Button } from "heroui-native";
import { View } from "react-native";

type SocialAuthButtonsProps = {
  mode: "sign-in" | "sign-up";
  onUnavailable?: () => void;
};

export function SocialAuthButtons({
  onUnavailable,
}: SocialAuthButtonsProps) {

  return (
    <View className="gap-3">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onPress={onUnavailable}
      >
        <Button.Label>Google</Button.Label>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onPress={onUnavailable}
      >
        <Button.Label>Apple</Button.Label>
      </Button>
    </View>
  );
}

import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Typography } from "heroui-native";

type AuthHeaderProps = {
  showBack?: boolean;
};

export function AuthHeader({ showBack = true }: AuthHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="px-5"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="relative h-10 items-center justify-center">
        {showBack ? (
          <Link href="../" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="absolute left-0 h-10 w-10 items-center justify-center"
            >
              <Typography.Heading type="h4" className="text-foreground">
                ←
              </Typography.Heading>
            </Pressable>
          </Link>
        ) : null}
        <Typography.Heading type="h4" weight="bold" className="text-accent">
          Voyager
        </Typography.Heading>
      </View>
    </View>
  );
}

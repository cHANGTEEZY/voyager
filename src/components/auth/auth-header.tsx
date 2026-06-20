import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ArrowLeft02Icon from "@hugeicons/core-free-icons/ArrowLeft02Icon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Typography } from "heroui-native";

type AuthHeaderProps = {
  showBack?: boolean;
};

export function AuthHeader({ showBack = true }: AuthHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="px-5" style={{ paddingTop: insets.top + 8 }}>
      <View className="relative h-10 items-center justify-center">
        {showBack ? (
          <Link href="../" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="absolute left-0 h-10 w-10 items-center justify-center"
            >
              <Typography.Heading type="h4" className="text-foreground">
                <HugeiconsIcon
                  icon={ArrowLeft02Icon}
                  size={24}
                  color="black"
                  strokeWidth={1.5}
                />
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

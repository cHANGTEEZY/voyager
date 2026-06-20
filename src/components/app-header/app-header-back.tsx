import ArrowLeft02Icon from "@hugeicons/core-free-icons/ArrowLeft02Icon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { PressableFeedback } from "heroui-native";

import { useHeaderIconColor } from "./use-header-icon-color";

export type AppHeaderBackProps = {
  /** Force show or hide. Defaults to showing only when navigation history exists. */
  show?: boolean;
  onPress?: () => void;
  className?: string;
};

export function AppHeaderBack({
  show,
  onPress,
  className,
}: AppHeaderBackProps) {
  const router = useRouter();
  const iconColor = useHeaderIconColor();
  const shouldShow = show ?? router.canGoBack();

  if (!shouldShow) {
    return null;
  }

  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className={`h-11 w-11 items-center justify-center ${className ?? ""}`}
      onPress={onPress ?? (() => router.back())}
    >
      <HugeiconsIcon
        icon={ArrowLeft02Icon}
        size={24}
        color={iconColor}
        strokeWidth={1.5}
      />
    </PressableFeedback>
  );
}

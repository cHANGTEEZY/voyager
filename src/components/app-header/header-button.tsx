import type { IconSvgElement } from "@hugeicons/react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { PressableFeedback } from "heroui-native";
import type { ReactNode } from "react";

import { useHeaderIconColor } from "./use-header-icon-color";

export type HeaderButtonProps = {
  accessibilityLabel: string;
  onPress: () => void;
  children?: ReactNode;
  icon?: IconSvgElement;
  iconSize?: number;
  className?: string;
};

export function HeaderButton({
  accessibilityLabel,
  onPress,
  children,
  icon,
  iconSize = 22,
  className,
}: HeaderButtonProps) {
  const iconColor = useHeaderIconColor();

  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`h-11 min-w-11 items-center justify-center ${className ?? ""}`}
      onPress={onPress}
    >
      {children ??
        (icon ? (
          <HugeiconsIcon
            icon={icon}
            size={iconSize}
            color={iconColor}
            strokeWidth={1.5}
          />
        ) : null)}
    </PressableFeedback>
  );
}

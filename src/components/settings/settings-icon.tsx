import type { IconSvgElement } from "@hugeicons/react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

type SettingsIconProps = {
  icon: IconSvgElement;
  size?: number;
};

export function SettingsIcon({ icon, size = 18 }: SettingsIconProps) {
  const accentColor = useCSSVariable("--accent");
  const iconColor = typeof accentColor === "string" ? accentColor : "#2d6a5f";

  return (
    <View className="size-9 items-center justify-center rounded-xl bg-accent/15">
      <HugeiconsIcon
        icon={icon}
        size={size}
        color={iconColor}
        strokeWidth={1.75}
      />
    </View>
  );
}

import { SettingsIcon } from "@/components/settings/settings-icon";
import type { IconSvgElement } from "@hugeicons/react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import SquareArrowUpRightIcon from "@hugeicons/core-free-icons/SquareArrowUpRightIcon";
import { ListGroup } from "heroui-native";
import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

type SettingsRowProps = {
  icon: IconSvgElement;
  label: string;
  onPress?: () => void;
  accessory?: ReactNode;
  value?: string;
  showChevron?: boolean;
  external?: boolean;
};

export function SettingsRow({
  icon,
  label,
  onPress,
  accessory,
  value,
  showChevron = false,
  external = false,
}: SettingsRowProps) {
  const mutedColor = useCSSVariable("--muted");
  const suffixColor = typeof mutedColor === "string" ? mutedColor : "#6b7280";

  const suffix = accessory ?? (
    <View className="flex-row items-center gap-2">
      {value ? (
        <Text className="text-sm font-medium text-muted">{value}</Text>
      ) : null}
      {external ? (
        <HugeiconsIcon
          icon={SquareArrowUpRightIcon}
          size={18}
          color={suffixColor}
          strokeWidth={1.75}
        />
      ) : showChevron ? (
        <ListGroup.ItemSuffix />
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <ListGroup.Item onPress={onPress} accessibilityRole="button">
        <ListGroup.ItemPrefix>
          <SettingsIcon icon={icon} />
        </ListGroup.ItemPrefix>
        <ListGroup.ItemContent>
          <ListGroup.ItemTitle>{label}</ListGroup.ItemTitle>
        </ListGroup.ItemContent>
        {suffix}
      </ListGroup.Item>
    );
  }

  return (
    <View className="flex-row items-center gap-3 p-4">
      <SettingsIcon icon={icon} />
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{label}</Text>
      </View>
      {suffix}
    </View>
  );
}

type SettingsToggleRowProps = {
  icon: IconSvgElement;
  label: string;
  accessory: ReactNode;
};

export function SettingsToggleRow({
  icon,
  label,
  accessory,
}: SettingsToggleRowProps) {
  return (
    <View className="flex-row items-center gap-3 p-4">
      <SettingsIcon icon={icon} />
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{label}</Text>
      </View>
      {accessory}
    </View>
  );
}

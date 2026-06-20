import { Typography } from "heroui-native";
import { View } from "react-native";

type LabeledSeparatorProps = {
  label: string;
  className?: string;
};

export function LabeledSeparator({ label, className }: LabeledSeparatorProps) {
  return (
    <View className={`my-8 flex-row items-center gap-3 ${className ?? ""}`}>
      <View className="h-px flex-1 bg-border" />
      <Typography
        type="body-xs"
        align="center"
        color="muted"
        className="shrink uppercase"
      >
        {label}
      </Typography>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}

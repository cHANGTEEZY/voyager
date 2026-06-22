import type { ReactNode } from "react";
import { Text, View } from "react-native";

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View className="gap-2">
      <Text className="px-1 text-xs font-semibold uppercase tracking-wider text-accent">
        {title}
      </Text>
      {children}
    </View>
  );
}

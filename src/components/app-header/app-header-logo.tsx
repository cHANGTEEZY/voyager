import { Typography } from "heroui-native";
import type { ReactNode } from "react";
import { View } from "react-native";

const APP_NAME = "Voyager";

export type AppHeaderLogoProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

export function AppHeaderLogo({
  title = APP_NAME,
  children,
  className,
}: AppHeaderLogoProps) {
  return (
    <View className={`items-center justify-center ${className ?? ""}`}>
      {children ?? (
        <Typography.Heading
          type="h4"
          weight="bold"
          className="text-accent"
          numberOfLines={1}
        >
          {title}
        </Typography.Heading>
      )}
    </View>
  );
}

import { View } from "react-native";

export type AppHeaderSpacerProps = {
  className?: string;
};

export function AppHeaderSpacer({ className }: AppHeaderSpacerProps) {
  return <View className={`flex-1 ${className ?? ""}`} />;
}

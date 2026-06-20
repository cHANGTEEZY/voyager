import { Redirect } from "expo-router";
import { Spinner } from "heroui-native";
import { View } from "react-native";

import { useAppGate } from "@/hooks/use-app-gate";

export default function Index() {
  const destination = useAppGate();

  if (!destination) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Spinner size="lg" />
      </View>
    );
  }

  return <Redirect href={destination} />;
}

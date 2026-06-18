import { Button } from "heroui-native";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Button
        variant="primary"
        onPress={() => console.log("HeroUI Native is ready")}
        style={{ color: "white" }}
      >
        <Text className="text-white">Get Started</Text>
      </Button>
    </View>
  );
}

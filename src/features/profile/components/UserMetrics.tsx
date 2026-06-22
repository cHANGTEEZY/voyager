import { Text, View } from "react-native";

const UserMetrics = () => {
  const friends = 124;
  const trips = 32;

  return (
    <View className="flex-row items-center justify-center gap-4 self-center">
      <View className="flex-col items-center justify-center">
        <Text className="text-lg font-bold text-foreground">{friends}</Text>
        <Text className="text-xs font-medium text-muted">Friends</Text>
      </View>

      <View className="flex-col items-center justify-center">
        <Text className="text-lg font-bold text-foreground">{trips}</Text>
        <Text className="text-xs font-medium text-muted">Trips</Text>
      </View>
    </View>
  );
};

export default UserMetrics;

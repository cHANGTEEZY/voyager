import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Button, Typography } from "heroui-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black">
      <Image
        source={require("@/assets/images/voyager-welcome.jpg")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View className="absolute inset-0 bg-black/45" />

      <View
        className="flex-1 justify-between px-6"
        style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
      >
        <View className="items-center">
          <Typography.Heading type="h3" weight="bold" className="text-white">
            ✈ Voyager
          </Typography.Heading>
        </View>

        <View className="gap-3">
          <Typography.Heading type="h1" weight="bold" className="text-white">
            Capture the Journey.
          </Typography.Heading>
          <Typography.Paragraph className="text-white/85">
            Document your travels and share unforgettable stories with friends.
          </Typography.Paragraph>

          <View className="mt-6 gap-3">
            <Link href="/(auth)/signup" asChild>
              <Button size="lg" className="w-full bg-accent">
                <Button.Label>Sign Up</Button.Label>
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/80"
              onPress={() => {
                router.push("/(auth)/login");
              }}
            >
              <Button.Label className="text-white">Log In</Button.Label>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

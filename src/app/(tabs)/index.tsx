import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { Button, Typography } from "heroui-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/(auth)/welcome");
  };

  return (
    <View
      className="flex-1 bg-background px-6"
      style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
    >
      <Typography.Heading type="h2" weight="bold" className="mb-2 text-foreground">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}
      </Typography.Heading>
      <Typography.Paragraph color="muted" className="mb-8">
        Your travel stories live here. Start documenting your next adventure.
      </Typography.Paragraph>

      <Button variant="outline" size="lg" onPress={handleSignOut}>
        <Button.Label>Sign Out</Button.Label>
      </Button>
    </View>
  );
}

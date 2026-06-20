import { authClient } from "@/lib/auth-client";
import { Redirect } from "expo-router";
import { Spinner } from "heroui-native";
import { View } from "react-native";

export function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Spinner size="lg" />
      </View>
    );
  }

  if (session?.user) {
    return <Redirect href="/(tabs)" />;
  }

  return children;
}

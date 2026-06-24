import AppHeader from "@/components/AppHeader";
import { authClient } from "@/lib/auth-client";
import { generateInitials } from "@/lib/utils/get-intials";
import Settings02Icon from "@hugeicons/core-free-icons/Settings02Icon";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { Image, ScrollView, Text, View } from "react-native";
import UserMetrics from "./components/UserMetrics";
import UserPosts from "./components/UserPosts";

const Profile = () => {
  const { data } = authClient.useSession();

  const user = data?.user;

  const initials = generateInitials(user?.name);
  const hasImage = !!user?.image;

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
    >
      <AppHeader>
        <AppHeader.Back reserveSpace />
        <AppHeader.Logo centered />
        <AppHeader.IconButton
          icon={Settings02Icon}
          label="Open settings"
          onPress={() => router.push("/settings")}
        />
      </AppHeader>

      <View className="flex-1 gap-4">
        <View className="my-2.5 items-center justify-center">
          {hasImage ? (
            <Image
              source={{ uri: user?.image as string }}
              className="mb-4 size-[110px] rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View className="mb-4 size-[110px] items-center justify-center rounded-full bg-default">
              <Text className="text-3xl font-bold text-default-foreground">
                {initials}
              </Text>
            </View>
          )}

          <Text className="mb-1.5 text-center text-[22px] font-bold text-foreground">
            {user?.name ?? "No name"}
          </Text>

          {!!user?.email && (
            <Text className="text-center text-[15px] text-muted">
              {user.email}
            </Text>
          )}
        </View>

        <UserMetrics />

        <Button
          variant="outline"
          onPress={() => console.log("Edit profile pressed")}
          className="flex border-2"
        >
          <Button.Label>Edit Profile</Button.Label>
        </Button>

        <UserPosts />
      </View>
    </ScrollView>
  );
};

export default Profile;

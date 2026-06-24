import AppHeader from "@/components/AppHeader";
import { authClient } from "@/lib/auth-client";
import { generateInitials } from "@/lib/utils/get-intials";
import Settings02Icon from "@hugeicons/core-free-icons/Settings02Icon";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { Image, StyleSheet, Text, View } from "react-native";

import UserMetrics from "./UserMetrics";

function ProfileHeader() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const initials = generateInitials(user?.name);
  const hasImage = !!user?.image;

  return (
    <View className="gap-4 pb-4">
      <AppHeader>
        <AppHeader.Back reserveSpace />
        <AppHeader.Logo centered />
        <AppHeader.IconButton
          icon={Settings02Icon}
          label="Open settings"
          onPress={() => router.push("/settings")}
        />
      </AppHeader>

      <View style={styles.profileView}>
        {hasImage ? (
          <Image
            source={{ uri: user?.image as string }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.initialsAvatar}>
            <Text style={styles.initialsText}>{initials}</Text>
          </View>
        )}

        <Text style={styles.nameText}>{user?.name ?? "No name"}</Text>

        {!!user?.email && <Text style={styles.emailText}>{user.email}</Text>}
      </View>

      <UserMetrics />

      <View className="px-6">
        <Button
          variant="outline"
          onPress={() => console.log("Edit profile pressed")}
          className="border-2"
        >
          <Button.Label>Edit Profile</Button.Label>
        </Button>
      </View>
    </View>
  );
}

export default ProfileHeader;

const styles = StyleSheet.create({
  profileView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },
  initialsAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  initialsText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  emailText: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
  },
});

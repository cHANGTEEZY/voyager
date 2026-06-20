import AppHeader, { HeaderButton } from "@/components/AppHeader";
import { authClient } from "@/lib/auth-client";
import { generateInitials } from "@/lib/utils/get-intials";
import Settings02Icon from "@hugeicons/core-free-icons/Settings02Icon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Button } from "heroui-native";
import { Image, StyleSheet, Text, View } from "react-native";
import UserMetrics from "./components/UserMetrics";

const Profile = () => {
  const { data } = authClient.useSession();

  const user = data?.user;

  const initials = generateInitials(user?.name);
  const hasImage = !!user?.image;

  return (
    <View style={styles.flex1}>
      <AppHeader>
        <AppHeader.Back />
        <AppHeader.Spacer />
        <AppHeader.Logo />
        <AppHeader.Spacer />
        <HeaderButton
          accessibilityLabel="Open profile menu"
          onPress={() => console.log("Open settings")}
        >
          <HugeiconsIcon icon={Settings02Icon} />
        </HeaderButton>
      </AppHeader>

      <View style={styles.flex1} className="gap-4">
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

        <Button
          variant="outline"
          onPress={() => console.log("Edit profile pressed")}
        >
          <Button.Label>Edit Profile</Button.Label>
        </Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: "#fff",
  },
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

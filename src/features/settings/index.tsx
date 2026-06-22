import AppHeader from "@/components/AppHeader";
import {
  SettingsGroup,
  SettingsProfileCard,
  SettingsRow,
  SettingsSection,
  SettingsToggleRow,
} from "@/components/settings";
import { useThemePreference } from "@/hooks/use-theme-preference";
import { authClient } from "@/lib/auth-client";
import BellIcon from "@hugeicons/core-free-icons/BellIcon";
import GlobeIcon from "@hugeicons/core-free-icons/GlobeIcon";
import HelpCircleIcon from "@hugeicons/core-free-icons/HelpCircleIcon";
import Link01Icon from "@hugeicons/core-free-icons/Link01Icon";
import Location01Icon from "@hugeicons/core-free-icons/Location01Icon";
import LockIcon from "@hugeicons/core-free-icons/LockIcon";
import Logout03Icon from "@hugeicons/core-free-icons/Logout03Icon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import Mail01Icon from "@hugeicons/core-free-icons/Mail01Icon";
import Moon02Icon from "@hugeicons/core-free-icons/Moon02Icon";
import Shield02Icon from "@hugeicons/core-free-icons/Shield02Icon";
import User02Icon from "@hugeicons/core-free-icons/User02Icon";
import Constants from "expo-constants";
import { router } from "expo-router";
import { Button, Switch, Typography } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";
const BUILD_NUMBER =
  Constants.expoConfig?.ios?.buildNumber ??
  Constants.expoConfig?.android?.versionCode?.toString() ??
  "1";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const { data: session } = authClient.useSession();
  const { isDarkMode, setDarkMode } = useThemePreference();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/(auth)/welcome");
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-4"
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <AppHeader className="px-0">
          <AppHeader.Back />
          <Typography.Heading type="h3" weight="bold" className="text-foreground">
            Settings
          </Typography.Heading>
        </AppHeader>

        <SettingsProfileCard
          name={user?.name}
          email={user?.email}
          image={(user as { image?: string } | undefined)?.image}
        />

        <SettingsSection title="Account">
          <SettingsGroup>
            <SettingsRow
              icon={User02Icon}
              label="Edit Profile"
              showChevron
              onPress={() => console.log("Edit profile")}
            />
            <SettingsRow
              icon={LockIcon}
              label="Change Password"
              showChevron
              onPress={() => console.log("Change password")}
            />
            <SettingsRow
              icon={Link01Icon}
              label="Linked Accounts"
              showChevron
              onPress={() => console.log("Linked accounts")}
            />
          </SettingsGroup>
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsGroup>
            <SettingsToggleRow
              icon={BellIcon}
              label="Push Notifications"
              accessory={
                <Switch
                  isSelected={pushNotifications}
                  onSelectedChange={setPushNotifications}
                />
              }
            />
            <SettingsToggleRow
              icon={Mail01Icon}
              label="Email Updates"
              accessory={
                <Switch
                  isSelected={emailUpdates}
                  onSelectedChange={setEmailUpdates}
                />
              }
            />
          </SettingsGroup>
        </SettingsSection>

        <SettingsSection title="Privacy & Safety">
          <SettingsGroup>
            <SettingsRow
              icon={Location01Icon}
              label="Location Services"
              showChevron
              onPress={() => console.log("Location services")}
            />
            <SettingsRow
              icon={Shield02Icon}
              label="Account Privacy"
              showChevron
              onPress={() => console.log("Account privacy")}
            />
          </SettingsGroup>
        </SettingsSection>

        <SettingsSection title="Preferences">
          <SettingsGroup>
            <SettingsToggleRow
              icon={Moon02Icon}
              label="Dark Mode"
              accessory={
                <Switch isSelected={isDarkMode} onSelectedChange={setDarkMode} />
              }
            />
            <SettingsRow
              icon={GlobeIcon}
              label="Language"
              value="English"
              showChevron
              onPress={() => console.log("Language")}
            />
          </SettingsGroup>
        </SettingsSection>

        <SettingsSection title="Support & About">
          <SettingsGroup>
            <SettingsRow
              icon={HelpCircleIcon}
              label="Help Center"
              external
              onPress={() => console.log("Help center")}
            />
            <SettingsRow
              icon={Shield02Icon}
              label="Privacy Policy"
              showChevron
              onPress={() => console.log("Privacy policy")}
            />
            <SettingsRow
              icon={Shield02Icon}
              label="Terms of Service"
              showChevron
              onPress={() => console.log("Terms of service")}
            />
          </SettingsGroup>
        </SettingsSection>

        <Button
          variant="secondary"
          size="lg"
          className="rounded-2xl bg-danger/15"
          onPress={handleSignOut}
        >
          <HugeiconsIcon icon={Logout03Icon} size={18} strokeWidth={1.75} />
          <Button.Label className="font-semibold text-danger">
            Log Out
          </Button.Label>
        </Button>

        <Text className="text-center text-xs text-muted">
          Voyager Version {APP_VERSION} (Build {BUILD_NUMBER})
        </Text>
      </ScrollView>
    </View>
  );
}

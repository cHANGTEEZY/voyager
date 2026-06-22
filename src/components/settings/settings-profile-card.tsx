import { generateInitials } from "@/lib/utils/get-intials";
import { Avatar, Card, Typography } from "heroui-native";
import { View } from "react-native";

type SettingsProfileCardProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  handle?: string;
  badge?: string;
};

function buildHandle(email?: string | null, name?: string | null) {
  if (email?.includes("@")) {
    return `@${email.split("@")[0]}`;
  }

  if (name) {
    return `@${name.toLowerCase().replace(/\s+/g, "_")}`;
  }

  return "@voyager";
}

export function SettingsProfileCard({
  name,
  email,
  image,
  handle,
  badge = "Explorer Pro",
}: SettingsProfileCardProps) {
  const displayName = name?.trim() || "Traveler";
  const displayHandle = handle ?? buildHandle(email, name);
  const initials = generateInitials(displayName);
  const hasImage = Boolean(image);

  return (
    <Card className="rounded-2xl">
      <Card.Body className="flex-row items-center gap-4 p-4">
        <Avatar size="lg" color="accent">
          {hasImage ? (
            <Avatar.Image source={{ uri: image as string }} />
          ) : (
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          )}
        </Avatar>

        <View className="flex-1 gap-1">
          <Typography.Heading type="h4" weight="bold" className="text-foreground">
            {displayName}
          </Typography.Heading>
          <Typography.Paragraph color="muted" className="text-sm">
            {displayHandle} • {badge}
          </Typography.Paragraph>
        </View>
      </Card.Body>
    </Card>
  );
}

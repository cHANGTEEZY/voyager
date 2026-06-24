import ArrowLeft02Icon from "@hugeicons/core-free-icons/ArrowLeft02Icon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { PressableFeedback, Typography } from "heroui-native";
import type { ComponentProps, ReactNode } from "react";
import {
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useCSSVariable } from "uniwind";

const APP_NAME = "Voyager";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function useHeaderIconColor(fallback = "#1a1a1a") {
  const foregroundColor = useCSSVariable("--foreground");
  return typeof foregroundColor === "string" ? foregroundColor : fallback;
}

type HugeIconSource = ComponentProps<typeof HugeiconsIcon>["icon"];

export type AppHeaderProps = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

function AppHeaderRoot({ children, className, style }: AppHeaderProps) {
  return (
    <View
      style={style}
      className={cx("relative min-h-11 flex-row items-center gap-1", className)}
    >
      {children}
    </View>
  );
}

export type AppHeaderItemAlign = "start" | "center" | "end";
export type AppHeaderItemSize = "content" | "icon" | "fill";

export type AppHeaderItemProps = {
  children?: ReactNode;
  align?: AppHeaderItemAlign;
  size?: AppHeaderItemSize;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

function AppHeaderItem({
  children,
  align = "center",
  size = "content",
  className,
  style,
}: AppHeaderItemProps) {
  const alignClassName = {
    start: "items-start justify-center",
    center: "items-center justify-center",
    end: "items-end justify-center",
  }[align];

  const sizeClassName = {
    content: "min-h-11",
    icon: "h-11 w-11",
    fill: "min-h-11 flex-1",
  }[size];

  return (
    <View
      style={style}
      className={cx(sizeClassName, alignClassName, className)}
    >
      {children}
    </View>
  );
}

export type AppHeaderSpacerProps = {
  className?: string;
};

function AppHeaderSpacer({ className }: AppHeaderSpacerProps) {
  return <View className={cx("flex-1", className)} />;
}

export type AppHeaderIconButtonProps = {
  icon: HugeIconSource;
  label: string;
  onPress?: () => void;
  className?: string;
  iconClassName?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
};

function AppHeaderIconButton({
  icon,
  label,
  onPress,
  className,
  color,
  size = 24,
  strokeWidth = 1.5,
}: AppHeaderIconButtonProps) {
  const themeIconColor = useHeaderIconColor();
  const iconColor = color ?? themeIconColor;

  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel={label}
      className={cx("h-11 w-11 items-center justify-center", className)}
      onPress={onPress}
    >
      <HugeiconsIcon
        icon={icon}
        size={size}
        color={iconColor}
        strokeWidth={strokeWidth}
      />
    </PressableFeedback>
  );
}

export type AppHeaderBackProps = {
  /**
   * Force show or hide.
   * Defaults to showing only when navigation history exists.
   */
  show?: boolean;

  /**
   * Keeps an empty 44x44 space when hidden.
   * Useful when you want stable spacing.
   */
  reserveSpace?: boolean;

  onPress?: () => void;
  className?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
};

function AppHeaderBack({
  show,
  reserveSpace = false,
  onPress,
  className,
  color,
  size,
  strokeWidth,
  label = "Go back",
}: AppHeaderBackProps) {
  const router = useRouter();
  const shouldShow = show ?? router.canGoBack();

  if (!shouldShow) {
    return reserveSpace ? (
      <AppHeaderItem size="icon" className={className} />
    ) : null;
  }

  return (
    <AppHeaderIconButton
      icon={ArrowLeft02Icon}
      label={label}
      onPress={onPress ?? (() => router.back())}
      className={className}
      color={color}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}

export type AppHeaderLogoProps = {
  title?: string;
  children?: ReactNode;
  source?: ImageSourcePropType;

  /**
   * When true, the logo is absolutely centered in the header.
   * This is useful for layouts like:
   *
   * <AppHeader>
   *   <AppHeader.Back />
   *   <AppHeader.Logo centered />
   * </AppHeader>
   *
   * The logo stays visually centered even though only the back button exists on the left.
   */
  centered?: boolean;

  className?: string;
  imageClassName?: string;
  style?: StyleProp<ViewStyle>;
};

function AppHeaderLogo({
  title = APP_NAME,
  children,
  source,
  centered = false,
  className,
  imageClassName,
  style,
}: AppHeaderLogoProps) {
  const content =
    children ??
    (source ? (
      <Image
        source={source}
        className={cx("h-8 w-8 rounded-full", imageClassName)}
        resizeMode="cover"
      />
    ) : (
      <Typography.Heading
        type="h4"
        weight="bold"
        className="text-accent"
        numberOfLines={1}
      >
        {title}
      </Typography.Heading>
    ));

  if (centered) {
    return (
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, style]}
        className={cx("items-center justify-center px-14", className)}
      >
        {content}
      </View>
    );
  }

  return (
    <AppHeaderItem
      align="center"
      size="content"
      className={className}
      style={style}
    >
      {content}
    </AppHeaderItem>
  );
}

export type AppHeaderDefaultProps = {
  children?: ReactNode;
};

function AppHeaderDefault({ children }: AppHeaderDefaultProps) {
  return (
    <>
      <AppHeaderBack />
      <AppHeaderSpacer />
      <AppHeaderLogo />
      <AppHeaderSpacer />
      {children}
    </>
  );
}

export const AppHeader = Object.assign(AppHeaderRoot, {
  Item: AppHeaderItem,
  Spacer: AppHeaderSpacer,
  Back: AppHeaderBack,
  Logo: AppHeaderLogo,
  IconButton: AppHeaderIconButton,
  Default: AppHeaderDefault,
});

export default AppHeader;

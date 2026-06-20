import type { ReactNode } from "react";
import { View } from "react-native";

import { AppHeaderBack } from "./app-header-back";
import { AppHeaderLogo } from "./app-header-logo";
import { AppHeaderSpacer } from "./app-header-spacer";

export type AppHeaderProps = {
  children: ReactNode;
  className?: string;
};

function AppHeaderRoot({ children, className }: AppHeaderProps) {
  return (
    <View className="min-h-11 flex-row items-center gap-1">{children}</View>
  );
}

function AppHeaderDefault({ children }: { children?: ReactNode }) {
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
  Back: AppHeaderBack,
  Logo: AppHeaderLogo,
  Spacer: AppHeaderSpacer,
  Default: AppHeaderDefault,
});

export default AppHeader;

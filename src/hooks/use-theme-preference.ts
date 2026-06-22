import {
  STORAGE_KEYS,
  type ThemePreference,
} from "@/constants/storage-keys";
import { secureStorage } from "@/lib/utils/secure-store";
import { useCallback, useEffect, useState } from "react";
import { Uniwind, useUniwind } from "uniwind";

export function useThemeBootstrap() {
  useEffect(() => {
    void secureStorage
      .getItem<ThemePreference>(STORAGE_KEYS.themePreference)
      .then((stored) => {
        if (stored) {
          Uniwind.setTheme(stored);
        }
      });
  }, []);
}

export function useThemePreference() {
  const { theme } = useUniwind();
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    void secureStorage
      .getItem<ThemePreference>(STORAGE_KEYS.themePreference)
      .then((stored) => {
        if (stored) {
          setPreference(stored);
        }
        setIsReady(true);
      });
  }, []);

  const setThemePreference = useCallback(async (next: ThemePreference) => {
    Uniwind.setTheme(next);
    setPreference(next);
    await secureStorage.setItem(STORAGE_KEYS.themePreference, next);
  }, []);

  const isDarkMode = theme === "dark";

  const setDarkMode = useCallback(
    async (enabled: boolean) => {
      await setThemePreference(enabled ? "dark" : "light");
    },
    [setThemePreference],
  );

  return {
    theme,
    preference,
    isDarkMode,
    isReady,
    setDarkMode,
    setThemePreference,
  };
}

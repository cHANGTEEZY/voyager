import Constants from "expo-constants";
import { Platform } from "react-native";

const DEFAULT_API_URL = "http://localhost:3000";

/**
 * Resolves the API base URL for the current runtime.
 *
 * - Web / iOS simulator: localhost works as-is
 * - Android emulator: localhost → 10.0.2.2 (host machine)
 * - Physical device: localhost → Metro bundler host (your LAN IP)
 */
export function getApiBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
  let url = configured ?? DEFAULT_API_URL;

  if (Platform.OS === "web") {
    return url;
  }

  const usesLocalhost = /localhost|127\.0\.0\.1/.test(url);
  if (!usesLocalhost) {
    return url;
  }

  if (Platform.OS === "android" && !Constants.isDevice) {
    return url.replace(/localhost|127\.0\.0\.1/g, "10.0.2.2");
  }

  const metroHost = Constants.expoConfig?.hostUri?.split(":")[0];
  if (Constants.isDevice && metroHost) {
    return url.replace(/localhost|127\.0\.0\.1/g, metroHost);
  }

  return url;
}

import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";

const DEFAULT_API_URL = "http://localhost:3000";

function getMetroHost(): string | undefined {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    return hostUri.split(":")[0];
  }

  const debuggerHost = Constants.expoGoConfig?.debuggerHost;
  if (debuggerHost) {
    return debuggerHost.split(":")[0];
  }

  const linkingUri = Constants.linkingUri ?? Constants.experienceUrl;
  if (linkingUri) {
    try {
      return new URL(linkingUri.replace(/^exp:\/\//, "http://")).hostname;
    } catch {
      return undefined;
    }
  }

  return undefined;
}

/**
 * Resolves the API base URL for the current runtime.
 *
 * - Web / iOS simulator: localhost works as-is
 * - Android emulator: localhost → 10.0.2.2 (host machine)
 * - Physical device: localhost → Metro bundler host (your LAN IP)
 */
export function getApiBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
  const url = configured ?? DEFAULT_API_URL;

  if (Platform.OS === "web") {
    return url;
  }

  const usesLocalhost = /localhost|127\.0\.0\.1/.test(url);
  if (!usesLocalhost) {
    return url;
  }

  if (Platform.OS === "android" && !Device.isDevice) {
    return url.replace(/localhost|127\.0\.0\.1/g, "10.0.2.2");
  }

  const metroHost = getMetroHost();
  if (Device.isDevice && metroHost) {
    return url.replace(/localhost|127\.0\.0\.1/g, metroHost);
  }

  return url;
}

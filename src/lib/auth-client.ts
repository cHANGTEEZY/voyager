import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { getApiBaseUrl } from "./get-api-url";

const API_URL = getApiBaseUrl();

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    expoClient({
      scheme: "Voyager",
      storagePrefix: "Voyager",
      storage: SecureStore,
      cookiePrefix: "voyager",
    }),
  ],
});

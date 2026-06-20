import * as SecureStore from "expo-secure-store";

type SecureValue = string | number | boolean | object | null;

const secureStoreOptions: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
};

export const secureStorage = {
  async setItem<T extends SecureValue>(
    key: string,
    value: T,
  ): Promise<boolean> {
    try {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);

      await SecureStore.setItemAsync(key, stringValue, secureStoreOptions);
      return true;
    } catch (error) {
      console.error(`SecureStore setItem error for key "${key}":`, error);
      return false;
    }
  },

  async getItem<T = string>(key: string): Promise<T | null> {
    try {
      const value = await SecureStore.getItemAsync(key, secureStoreOptions);

      if (value == null) return null;

      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch (error) {
      console.error(`SecureStore getItem error for key "${key}":`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(key, secureStoreOptions);
      return true;
    } catch (error) {
      console.error(`SecureStore removeItem error for key "${key}":`, error);
      return false;
    }
  },

  async hasItem(key: string): Promise<boolean> {
    try {
      const value = await SecureStore.getItemAsync(key, secureStoreOptions);
      return value !== null;
    } catch (error) {
      console.error(`SecureStore hasItem error for key "${key}":`, error);
      return false;
    }
  },
};

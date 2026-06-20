import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: "newspaper", selected: "newspaper.fill" }}
          md={{ default: "newspaper", selected: "newspaper" }}
        />
        <NativeTabs.Trigger.Label>Feed</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon
          sf={{ default: "magnifyingglass", selected: "magnifyingglass" }}
          md={{ default: "search", selected: "search" }}
        />
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="create">
        <NativeTabs.Trigger.Icon
          sf={{ default: "plus", selected: "plus" }}
          md={{ default: "add", selected: "add" }}
        />
        <NativeTabs.Trigger.Label>Create</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf={{ default: "person", selected: "person.2" }}
          md={{ default: "person", selected: "person" }}
        />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

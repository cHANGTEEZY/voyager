import AppHeader from "@/components/AppHeader";
import Tick02Icon from "@hugeicons/core-free-icons/Tick02Icon";
import { ScrollView, Text, View } from "react-native";

const CreateForm = () => {
  const handlePublish = () => {
    console.log("Publish post");
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
    >
      <AppHeader>
        <AppHeader.Item>
          <Text className="text-base text-muted">Cancel</Text>
        </AppHeader.Item>
        <AppHeader.Logo title="Create Post" centered />
        <AppHeader.Spacer />
        <AppHeader.IconButton
          icon={Tick02Icon}
          label="Publish post"
          onPress={() => {
            // open settings
          }}
        />
      </AppHeader>
      <View className="flex-1 px-4 py-6">
        <Text className="text-base text-muted">
          Share your latest adventure with the Voyager community.
        </Text>
      </View>
    </ScrollView>
  );
};

export default CreateForm;

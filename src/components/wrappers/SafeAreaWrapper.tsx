import { StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={["left", "right"]}
      className="flex-1 bg-background"
      style={styles.flex1}
    >
      <View
        className="bg-background px-4"
        style={[
          styles.paddingHorizontal,
          styles.flex1,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
});

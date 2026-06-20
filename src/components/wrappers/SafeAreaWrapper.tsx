import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

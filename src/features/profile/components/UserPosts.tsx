import VoyagerImage from "@/assets/images/voyager-welcome.jpg";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

const dummyData = [
  { id: 1, image: VoyagerImage },
  { id: 2, image: VoyagerImage },
  { id: 3, image: VoyagerImage },
  { id: 4, image: VoyagerImage },
  { id: 5, image: VoyagerImage },
  { id: 6, image: VoyagerImage },
];

const UserPosts = () => {
  return (
    <FlashList
      data={dummyData}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.imageWrapper}>
          <Image source={item.image} style={styles.image} contentFit="cover" />
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default UserPosts;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  contentContainer: {
    marginBottom: 16,
  },
  imageWrapper: {
    flex: 1,
    margin: 6,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
});

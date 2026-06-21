import { StyleSheet, Text, View } from "react-native";

const UserMetrics = () => {
  const friends = 124;
  const trips = 32;

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonStyles}>
        <Text style={styles.typographyHeading}>{friends}</Text>
        <Text style={styles.typographyParagraph} className="text-gray-800">
          Friends
        </Text>
      </View>

      <View style={styles.buttonStyles}>
        <Text style={styles.typographyHeading}>{trips}</Text>
        <Text style={styles.typographyParagraph} className="text-gray-800">
          Trips
        </Text>
      </View>
    </View>
  );
};

export default UserMetrics;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 16,
  },

  buttonStyles: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  typographyHeading: {
    fontWeight: "700",
    fontSize: 18,
  },

  typographyParagraph: {
    fontWeight: "500",
    fontSize: 12,
  },
});

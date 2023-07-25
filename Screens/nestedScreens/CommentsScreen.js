import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "white",
        paddingTop: 32, 
        paddingLeft: 16,
        paddingRight: 16,
  },
});

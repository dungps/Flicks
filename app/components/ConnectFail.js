import React from "react";

import { View, Text } from "react-native";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default () => {
  return (
    <View style={styles.container}>
      <Text>Connect Lost</Text>
    </View>
  );
};

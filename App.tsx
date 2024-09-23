import React  from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import AppComponent from "./src";

LogBox.ignoreAllLogs(false)

export default function App() {
  return (
    <View style={styles.container}>
      <AppComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

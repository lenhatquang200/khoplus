import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppComponent from "./src";
import { enableScreens } from "react-native-screens";
import * as SplashScreen from "expo-splash-screen";
export default function App() {
  enableScreens();

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

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppComponent from "./src";
import { enableScreens } from "react-native-screens";

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

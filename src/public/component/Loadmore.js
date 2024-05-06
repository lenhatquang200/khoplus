import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colorApp from "../colorApp";
import settingApp from "../settingApp";

export default function Loadmore({ width = settingApp.width, height = 60 }) {
  return (
    <View
      style={[
        styles.container,
        {
          width: width,
          height: height,
        },
      ]}
    >
      <ActivityIndicator size="small" color={colorApp.colorPlaceText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

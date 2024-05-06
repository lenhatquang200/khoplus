import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet } from "react-native";
import colorApp from "../colorApp";
import settingApp from "../settingApp";

export default function LinearBackGround() {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[colorApp.green_primary, colorApp.white]}
      style={styles.background}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: settingApp.height,
  },
});

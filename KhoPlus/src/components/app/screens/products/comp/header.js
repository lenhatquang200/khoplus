import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colorApp, settingApp } from "../../../../../public";
export default function HeaderProducts(props) {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    paddingTop: settingApp.statusBarHeight,
    backgroundColor: colorApp.green_001,
    height: 120,
  },
});

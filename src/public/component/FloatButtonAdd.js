import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colorApp from "public/colorApp";
import settingApp from "public/settingApp";

export default function FloatButtonAdd({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.view_Add}>
      <MaterialIcons name="add" color={colorApp.white} size={40} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  view_Add: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 40,
    backgroundColor: colorApp.blue_primary,
    bottom: 32,
    right: 16,
    ...settingApp.shadow_Item,
  },
});

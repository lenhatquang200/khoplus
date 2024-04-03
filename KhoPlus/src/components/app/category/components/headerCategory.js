import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colorApp, settingApp, Component } from "../../../../public";

export default function HeaderCategory(props) {
  console.log("HeaderCategory", props);
  const { colleague } = props || {};
  return (
    <View style={styles.container}>
      <Text style={styles.txt_name}>{colleague?.name}</Text>

      <View style={styles.buttom_rigth}>
        {/* <MaterialCommunityIcons
          name="face-man-profile"
          color={colorApp.colorText}
          size={28}
        /> */}

        <Component.AvatarCustom name={colleague?.name} size={24} />
        <Ionicons name="settings-sharp" color={colorApp.colorText} size={28} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 32,
  },
  txt_name: {
    fontSize: settingApp.size_18,
    fontWeight: "600",
    color: colorApp.white,
  },
  buttom_rigth: {
    flexDirection: "row",
    height: 80,
    width: settingApp.width_32 / 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

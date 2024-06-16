import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colorApp, settingApp, Component } from "../../../../public";
import { HeaderAction } from "public/component";

export default function HeaderCategory(props) {
  const { colleague } = props || {};

  function chilldrendView() {
    return (
      <View style={styles.buttom_rigth}>
        <Component.AvatarCustom name={colleague?.name} size={24} />
        <Ionicons name="settings-sharp" color={colorApp.white} size={28} />
      </View>
    );
  }

  return <HeaderAction title={colleague?.name} chilldrend={chilldrendView()} />;
}

const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    height: settingApp.statusBarHeight + 60,
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

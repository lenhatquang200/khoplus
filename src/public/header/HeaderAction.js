import React from "react";
import { View, Text, StyleSheet } from "react-native";
import settingApp from "public/settingApp";
import colorApp from "public/colorApp";

export default function HeaderAction({ title, chilldrend, styleTitle, style }) {
  title = title || "";
  chilldrend = chilldrend || <View />;
  return (
    <View style={[styles.container, {...style}]}>
      <Text style={[styles.txt_name, { ...styleTitle}]}>{title}</Text>

      {chilldrend}
    </View>
  );
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

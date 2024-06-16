import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import settingApp from "../settingApp";
import colorApp from "../colorApp";
import * as Icon from "../icon";
import lang from "../locate";

const { width } = settingApp;

export default function HeaderName({ title, goBack }) {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={styles.statusBar} />}

      <View style={styles.view_main}>
        <TouchableOpacity onPress={goBack} style={styles.bt_goback}>
          <Icon.arrow_Left size={24} color={colorApp.colorText} />
        </TouchableOpacity>
        <Text style={styles.txt_title}>{title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colorApp.white,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  statusBar: {
    width,
    height: settingApp.statusBarHeight + 20,
  },
  view_main: {
    width,
    height: 100 - settingApp.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
  },
  bt_goback: {
    width: 40,
    height: 42,
    justifyContent: "center",
  },
  txt_title: {
    fontSize: settingApp.size_24,
    fontWeight: "bold",
    color: settingApp.colorText,
    marginBottom: settingApp.space_6,
  },
  box_search: {
    width: width - 75,
    height: 32,
    backgroundColor: colorApp.black_opacity_01,
    justifyContent: "center",
    paddingLeft: settingApp.space_8,
    borderRadius: 12,
  },
});

import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { colorApp, imageApp, lang, settingApp } from "../../../../public";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH_CONTENT = settingApp.width_32 / 3;
export default function MenuTop(props) {
  function renderItem(image, title) {
    return (
      <TouchableOpacity style={styles.view_item}>
        <Image
          source={image}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />

        <Text style={styles.txt_item}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        {renderItem(imageApp.checkIn, lang.checkIn)}
        {renderItem(imageApp.cashier, lang.cashier)}
        {renderItem(imageApp.analysis, lang.analysis)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    minHeight: 60,
    backgroundColor: colorApp.white,
    marginLeft: 16,
    borderRadius: 8,
    ...settingApp.shadow,
    marginTop: 16,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  viewContent: {
    width: settingApp.width_32,
    minHeight: 60,
    backgroundColor: colorApp.white,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  line: {
    width: 0.5,
    height: 100,
    backgroundColor: colorApp.black_opacity_05,
  },
  view_item: {
    minWidth: WIDTH_CONTENT,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_item: {
    fontSize: 16,
    marginTop: 8,
    color: colorApp.colorText,
    fontWeight: "500",
  },
});

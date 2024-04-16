import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colorApp, settingApp } from "../../../../public";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH_CONTENT = (settingApp.width_32 - 62) / 3;
export default function MenuTop(props) {
  function renderItemSell() {
    return (
      <TouchableOpacity style={styles.view_item}>
        <MaterialCommunityIcons
          name="cart-plus"
          color={colorApp.colorPlaceText}
          size={30}
        />
        <Text style={styles.txt_item}>{"Bán hàng"}</Text>
      </TouchableOpacity>
    );
  }

  function renderItemCheckin() {
    return (
      <TouchableOpacity style={styles.view_item}>
        <MaterialCommunityIcons
          name="clock-time-three-outline"
          color={colorApp.colorPlaceText}
          size={30}
        />
        <Text style={styles.txt_item}>{"Chấm công"}</Text>
      </TouchableOpacity>
    );
  }

  function renderItemView() {
    return (
      <TouchableOpacity style={styles.view_item}>
        <MaterialCommunityIcons
          name="chart-line"
          color={colorApp.colorPlaceText}
          size={30}
        />
        <Text style={styles.txt_item}>{"Báo cáo"}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {renderItemSell()}
      <View style={styles.line} />
      {renderItemCheckin()}
      <View style={styles.line} />
      {renderItemView()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32 - 60,
    minHeight: 120,
    backgroundColor: colorApp.white,
    marginLeft: 46,
    borderRadius: 20,
    ...settingApp.shadow,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
  },
  line: {
    width: 0.5,
    height: 100,
    backgroundColor: colorApp.black_opacity_05,
  },
  view_item: {
    width: WIDTH_CONTENT,
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

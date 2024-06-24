import { colorApp, lang, settingApp } from "public";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Item(props) {
  const { obj } = props || {};
  const { item } = obj || {};

  function renderInfo(lable, value) {
    return (
      <View style={styles.view_info}>
        <Text style={styles.txt_lable}>{lable}</Text>
        <Text style={styles.txt_place}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt_fullAddress}>
        {item?.str_join_show || lang.emptyText}
      </Text>

      <View style={styles.lineInfo}>
        {renderInfo("Tỉnh/Thành Phố:", item?.province)}
        {renderInfo("Quận/Huyện:", item?.district)}
      </View>

      <View style={styles.lineInfo}>
        {renderInfo("Phường/Xã:", item?.commune)}
        {renderInfo("Ấp/Thôn/Xóm:", item?.hamlet)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    minHeight: 60,
    borderBottomColor: colorApp.disable,
    borderBottomWidth: 8,
    padding: 16,
  },
  lineInfo: {
    flexDirection: "row",
    marginBottom: 8,
  },
  txt_fullAddress: {
    fontSize: settingApp.size_18,
    color: colorApp.colorText,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 5,
  },
  view_info: {
    width: settingApp.width_32 / 2,
    minHeight: 40,
  },
  txt_lable: {
    fontSize: settingApp.size_16,
    color: colorApp.blue_primary,
  },
  txt_place: {
    fontSize: settingApp.size_16,
    color: colorApp.colorPlaceText,
    fontWeight: "600",
  },
});

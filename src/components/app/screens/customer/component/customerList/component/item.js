import { Icon, colorApp, lang, settingApp } from "public";
import React, { useState, useEffect, memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Item = memo((props) => {
  const { item, index } = props?.obj || {};
  const [dataItem, setDataItem] = useState(item);
  console.log("itemitem", item);
  return (
    <View style={styles.container}>
      <View style={styles.view_icon}>
        <FontAwesome name="user" color={colorApp.disable} size={40} />
        <View style={styles.view_name}>
          <Text style={styles.txt_code}>{item?.phone || lang.emptyText}</Text>
          <Text style={styles.txt_name}>{item?.name || lang.emptyText}</Text>
        </View>
      </View>
      <View style={styles.view_store_address}>
        <View style={styles.view_store}>
          <Icon.icon_Store size={20} color={colorApp.green_004} />
          <Text style={styles.txt_store}>
            {item?.store?.name || lang.emptyText}
          </Text>
        </View>

        <View style={styles.view_store}>
          <Ionicons name="location-outline" color={colorApp.black} size={18} />
          <Text style={styles.txt_address}>
            {item?.address || lang.emptyText}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        //onPress={() => onUpdateItem(dataItem)}
        style={styles.bt_edit}
      >
        <Text style={styles.txt_call}>{lang.callPhone}</Text>
      </TouchableOpacity>
    </View>
  );
});
export default Item;

const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    minHeight: 80,
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderBottomColor: colorApp.black_opacity_01,
    borderBottomWidth: 8,
  },
  view_icon: {
    flexDirection: "row",
    width: settingApp.width_32,
  },
  view_name: {
    width: settingApp.width_32 - 35,
    marginLeft: 8,
  },
  txt_code: {
    fontSize: 14,
    color: colorApp.blue_primary,
  },
  txt_name: {
    fontSize: 20,
    color: colorApp.colorText,
    fontWeight: "600",
  },
  view_store_address: {
    width: settingApp.width_32,
    marginTop: 8,
  },
  txt_store: {
    fontSize: 16,
    color: colorApp.green_004,
    fontWeight: "500",
    marginLeft: 5,
  },
  view_store: {
    width: settingApp.width_32,
    minHeight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  txt_address: {
    fontSize: 14,
    marginLeft: 5,
    color: colorApp.colorText,
  },

  view_price: {
    flexDirection: "row",
    height: 25,
    alignItems: "center",
  },
  bt_delete: {
    width: 60,
    height: 30,
    backgroundColor: colorApp.red_opacity_03,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  bt_edit: {
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    position: "absolute",
    right: 16,
    backgroundColor: colorApp.green_opacity_01,
  },
  txt_call: {
    fontSize: 14,
    color: colorApp.green_005,
  },
});

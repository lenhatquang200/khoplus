import { colorApp, imageApp, settingApp } from "public";
import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const listHr = [
  { id: 1, name: "Lịch sử chấm công", icon: imageApp.history_checkin },
  { id: 2, name: "Xin nghỉ phép", icon: imageApp.leave },
  { id: 3, name: "Chi tiết lương", icon: imageApp.salary },
  { id: 4, name: "Thông tin khác", icon: imageApp.infomation },
];
export default function Indvidual() {
  function renderItemList(item, index) {
    return (
      <View
        style={[
          styles.itemList,
          {
            marginLeft: index % 2 === 0 ? 0 : 8,
          },
        ]}
      >
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{ width: 20, height: 20, marginBottom: 8 }}
        />
        <Text style={styles.txt_item}>{item?.name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        scrollEnabled={false}
        data={listHr}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item, index }) => renderItemList(item, index)}
        numColumns={2}
        style={styles.flatList}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    width: settingApp.width,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent:'center',
    alignItems:"center"
  },
  txt_title: {
    fontSize: 18,
    color: colorApp.white,
    fontWeight: "600",
  },
  flatList: {
    marginTop: 8,
  },
  itemList: {
    width: (settingApp.width_32 - 8) / 2,
    minHeight: 60,
    backgroundColor: colorApp.white,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  txt_item: {
    fontSize: settingApp.size_14,
    color: colorApp.colorText,
    fontWeight: "500",
  },
});

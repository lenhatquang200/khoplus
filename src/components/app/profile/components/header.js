import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { settingApp, colorApp, Component } from "../../../../public";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CONSTANTS from "./CONSTANTS";
const { width, height, space_16, size_20, size_24, space_8, width_32 } =
  settingApp;

function HeaderProfile(props) {
  const { colleague, onLogout } = props;
  return (
    <View style={styles.container}>
      {/* <View style={styles.view_title}>
        <Text style={styles.txt_title}>{"Thông tin"}</Text>
      </View> */}

      {/* view profile */}
      <View style={styles.view_info}>
        {/* image */}
        <Component.AvatarCustom name={colleague?.name} size={60} />
        {/* info */}
        <View style={styles.view_info_name}>
          <Text style={styles.txt_name}>
            {colleague?.name || CONSTANTS.NONE_DATA}
          </Text>
          <Text style={styles.txt_phone}>
            {colleague?.phone || CONSTANTS.NONE_DATA}
          </Text>
          <Text style={styles.txt_mail}>
            {colleague?.code || CONSTANTS.NONE_DATA}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default HeaderProfile;
const styles = StyleSheet.create({
  container: {
    width: width_32,
    minHeight: 150,
  },
  view_title: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_title: {
    fontSize: size_24,
    fontWeight: "600",
    color: colorApp.colorText,
  },
  view_info: {
    width: settingApp.width_32,
    minHeight: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorApp.white,
    paddingLeft: 16,
    borderRadius: 8,
    ...settingApp.shadow,
  },
  view_info_name: {
    minHeight: 80,
    justifyContent: "center",
    paddingLeft: space_16,
  },
  img_profile: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: colorApp.white,
  },
  txt_phone: {
    fontSize: space_16,
    color: colorApp.colorText,
    fontWeight: "600",
  },
  txt_name: {
    fontSize: size_20,
    color: colorApp.colorText,
    fontWeight: "600",
  },
  txt_mail: {
    fontSize: space_16,
    color: colorApp.colorText,
  },
});

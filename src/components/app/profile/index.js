import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { settingApp, colorApp, CONSTANTS_APP, Component, lang } from "public";
import { HeaderProfile } from "./components";
import KhoPlus from "KhoPlus/api/khoplusApi";
import CONSTANTS from "./components/CONSTANTS";
import { screenName } from "router/screenName";
import { HeaderAction, HeaderName, HeaderSearch } from "public/component";

const { space_8, space_16, size_14, size_20, width } = settingApp;
function Profile(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);
  console.log("colleague", colleague);

  async function _onLogout() {
    KhoPlus.LogOut();
    dispatch({ type: CONSTANTS_APP.USER_LOGOUT });
    setTimeout(() => {
      props.navigation.setParam;
      props.navigation.navigate(screenName.AUTH_APP, { isLogout: true });
    }, 500);
  }

  function buttonLogout() {
    return (
      <TouchableOpacity onPress={_onLogout} style={styles.bt_logout}>
        <Text style={styles.txt_logout}>{lang.logout}</Text>
        <MaterialIcons name="logout" color={colorApp.red} size={size_20} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.mainView}>
      <Component.LinearBackGround />
      <HeaderAction title={"Thông tin"} />
      <ScrollView style={{ paddingLeft: space_16 }}>
        <HeaderProfile colleague={colleague} />
        <View style={{ width, height: 450 }} />
        {buttonLogout()}
      </ScrollView>
    </View>
  );
}
export default Profile;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: settingApp.height,
  },
  bt_logout: {
    width: CONSTANTS.WIDTH_PADING,
    height: 45,
    backgroundColor: colorApp.white,
    borderRadius: space_8,
    alignItems: "center",
    paddingLeft: space_16,
    paddingRight: space_16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt_logout: {
    fontSize: size_14,
    color: colorApp.red,
    fontWeight: "600",
  },
  txt_titleHeader: {
    fontSize: settingApp.size_18,
    fontWeight: "600",
    color: colorApp.white,
  },
  view_header: {
    width: settingApp.width_32,
    height: settingApp.statusBarHeight + 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 32,
    paddingLeft: settingApp.space_16,
  },
});

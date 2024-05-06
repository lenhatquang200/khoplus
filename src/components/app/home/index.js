import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
  Platform,
  ScrollView,
} from "react-native";
import { Component, colorApp, settingApp } from "../../../public";
import HeaderHome from "./component/headerHome";
import MenuTop from "./component/menuTop";

function HomeScreen(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={styles.statusBar} />}
      <Component.LinearBackGround />
      <HeaderHome colleague={colleague} />

      <ScrollView>
        <MenuTop />
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    width: settingApp.width,
    height: settingApp.statusBarHeight + 20,
  },
});

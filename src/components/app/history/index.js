import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Component, colorApp, settingApp } from "../../../public";
import { EmptyView, HeaderAction } from "public/component";

function History(props) {
  const colleague = useSelector((state) => state?.app?.colleague);

  return (
    <View style={styles.container}>
      <Component.LinearBackGround />
      <HeaderAction title={"Lịch sử đơn hàng"} />

      <EmptyView styles={styles.styleLottie} />
    </View>
  );
}
export default History;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  styleLottie: {
    width: settingApp.width_32,
    height: settingApp.height,
  },
});

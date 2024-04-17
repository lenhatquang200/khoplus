import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colorApp from "../colorApp";
import settingApp from "../settingApp";
import lang from "../locate";
import LinearBackGround from "./LinearBackground";

export default function Nonedata(props:any) {
   let { isLinear, lable } = props || {}
  lable = lable || lang.noData;
  return (
    <View style={styles.main}>
      {isLinear && <LinearBackGround />}
      <View style={styles.main}>
        <Text style={styles.txt_content}>{lable}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: settingApp.width,
    height: settingApp.height,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_content: {
    fontSize: 16,
    color: colorApp.colorText,
    fontWeight: "bold",
  },
});

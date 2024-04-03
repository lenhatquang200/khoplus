import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import settingApp from "../settingApp";
import colorApp from "../colorApp";

function Loading() {
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        backgroundColor: colorApp.black_opacity_05,
        width: settingApp.width,
        height: settingApp.height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={colorApp.white} />
    </View>
  );
}
export default Loading;

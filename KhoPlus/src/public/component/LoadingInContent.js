import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import settingApp from "../settingApp";
import colorApp from "../colorApp";

function LoadingInContent(props) {
  let { width, height, color, backgroundColor } = props;
  width || settingApp.width;
  height || settingApp.height;
  color || colorApp.white;
  backgroundColor || "transparent";
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"small"} color={color} />
    </View>
  );
}
export default LoadingInContent;

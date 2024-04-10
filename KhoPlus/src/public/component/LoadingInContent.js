import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import settingApp from "../settingApp";
import colorApp from "../colorApp";
import LottieView from "lottie-react-native";
import lottiesJson from "../lottiesJson";

function LoadingInContent({
  width = settingApp.width,
  height = settingApp.height,
  color,
  backgroundColor,
  size = 120,
}) {
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
      <LottieView
        autoPlay
        source={lottiesJson.loading}
        style={{
          width: size,
          height: size,
        }}
        speed={1.5}
      />
    </View>
  );
}
export default LoadingInContent;

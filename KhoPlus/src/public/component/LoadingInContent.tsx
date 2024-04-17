import React, { Component } from "react";
import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";
import settingApp from "../settingApp";
import colorApp from "../colorApp";
import LottieView from "lottie-react-native";
import lottiesJson from "../lottiesJson";

interface Iprops{
    width:Number,
    height:Number,
    color:any,
    backgroundColor:String,
    size:Number,
    style:StyleProp<ViewStyle>
}

type Style = {
    container:ViewStyle,
    lottier:ViewStyle
}

function LoadingInContent(props:any) {
    const  {
        width = settingApp.width,
        height = settingApp.height,
        color,
        backgroundColor,
        size = 120,
      } = props || {}
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
        style={{ width: size, height: size,}}
        speed={1.5}
      />
    </View>
  );
}
export default LoadingInContent;
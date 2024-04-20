import React, { Component } from "react";
import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";
import settingApp from "../settingApp";
import colorApp from "../colorApp";
import LottieView from "lottie-react-native";
import lottiesJson from "../lottiesJson";

type Iprops = {
    width:number,
    height:number,
    color:string,
    backgroundColor:string,
    size:number,
}


function LoadingInContent(props:Partial<Iprops>) {
    const {
        width = settingApp.width,
        height = settingApp.height,
        color = colorApp.white,
        backgroundColor = "transparent",
        size = 120,
      } = props
  return (
    <View
      style={Container(backgroundColor, width, height)}
    >
      <LottieView
        autoPlay
        source={lottiesJson.loading}
        style={Lottie(size)}
        speed={1.5}
      />
    </View>
  );
}
export default LoadingInContent;
const Lottie = (size:number):ViewStyle => ({
    width: size, 
    height: size,
})

const Container=(backgroundColor:string, width:number, height:number):ViewStyle =>({
    backgroundColor: backgroundColor,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
})
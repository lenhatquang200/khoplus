import LottieView from "lottie-react-native";
import colorApp from "public/colorApp";
import imageApp from "public/imageApp";
import lottiesJson from "public/lottiesJson";
import settingApp from "public/settingApp";
import React, { Component, useRef } from "react";
import { View, Text, Image } from "react-native";

export default function EmptyView({ placeEmpty, styles }) {
  const lottie = useRef();

  return (
    <View
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        styles,
      ]}
    >
      <Image
        source={imageApp.empty}
        style={{ width: settingApp.width_32 / 3, height: settingApp.width / 3 }}
        resizeMode="contain"
      />

      <Text
        style={{
          fontSize: 16,
          color: colorApp.colorText,
          fontWeight: "600",
          marginTop: 16,
          textAlign: "center",
        }}
      >
        {"Hiện tại bạn chưa có đơn hàng nào!!"}
      </Text>
    </View>
  );
}

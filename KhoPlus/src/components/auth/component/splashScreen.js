import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { lottiesJson, settingApp } from "../../../public";
import { LinearBackGround } from "../../../public/component";

const { width, height } = settingApp;
export default function Splash() {
  const lottie = useRef(null);
  const [rand, setRand] = useState(1);

  useEffect(() => {
    setRamdomView();
  }, []);

  function setRamdomView() {
    let rand = (1 + Math.random() * (4 - 1)).toFixed();
    setRand(rand);
  }

  function getViewRamd() {
    if (rand == 1) {
      return (
        <LottieView
          ref={lottie}
          autoPlay
          renderMode="center"
          source={lottiesJson.managerJson}
          style={{
            width: width * 0.6,
            height: height,
          }}
        />
      );
    } else if (rand == 2) {
      return (
        <LottieView
          ref={lottie}
          autoPlay
          renderMode="center"
          source={lottiesJson.storeJson}
          style={{
            width: width * 0.6,
            height: height,
          }}
        />
      );
    } else if (rand == 3) {
      return (
        <LottieView
          ref={lottie}
          autoPlay
          renderMode="center"
          source={lottiesJson.shippingJson}
          style={{
            width: width * 0.6,
            height: height,
          }}
        />
      );
    } else {
      return (
        <LottieView
          ref={lottie}
          autoPlay
          renderMode="center"
          source={lottiesJson.settingJson}
          style={{
            width: width * 0.6,
            height: height,
          }}
        />
      );
    }
  }

  return (
    <View
      style={{
        width: settingApp.width,
        height: settingApp.height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearBackGround />
      {getViewRamd()}
    </View>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
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
          style={styles.lotties}
        />
      );
    } else if (rand == 2) {
      return (
        <LottieView
          ref={lottie}
          autoPlay
          renderMode="center"
          source={lottiesJson.storeJson}
          style={styles.lotties}
        />
      );
    } else if (rand == 3) {
      return (
        <LottieView
          ref={lottie}
          autoPlay
          renderMode="center"
          source={lottiesJson.shippingJson}
          style={styles.lotties}
        />
      );
    } else {
      return (
        <LottieView
          ref={lottie}
          autoPlay
          renderMode="center"
          source={lottiesJson.settingJson}
          style={styles.lotties}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <LinearBackGround />
      {getViewRamd()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    height: settingApp.height,
    justifyContent: "center",
    alignItems: "center",
  },
  lotties: {
    width: width * 0.6,
    height: height,
  },
});

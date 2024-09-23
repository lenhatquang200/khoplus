import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import settingApp from "../settingApp";

export default function SafeEra(props) {
  const { 
    children,
    barStyle = 'dark-content',
    backgroundStatusBar = 'white',
    translucent = false,
    overStatusBar = false
  } = props

  useEffect(() => {
      StatusBar.setBarStyle(barStyle);
      if (Platform.OS !== 'ios') {
        StatusBar.setBackgroundColor(backgroundStatusBar);
      }
      if (Platform.OS !== 'ios') {
        StatusBar.setTranslucent(true);
      }
  }, [barStyle, backgroundStatusBar, translucent]);

  return (
    <View
      style={[styles.background,{
        paddingTop: overStatusBar ? 0 : settingApp.statusBarHeight,
        ...props.style
      }]}
    >
    {children}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: settingApp.height,
    width:settingApp.width,
  },
});
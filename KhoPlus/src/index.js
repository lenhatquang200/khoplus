import { NavigationContainer } from "@react-navigation/native";
import React, { useRef, useEffect } from "react";
import { View, BackHandler, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import AppStack from "./router/appScreen";
import store from "./state/store";
import { colorApp, settingApp } from "./public";

export default function AppComponent(props) {
  const navigationContainer = useRef(null);
  useEffect(() => {
    const resp = navigationContainer?.current?.getCurrentRoute();
    const backAction = () => {
      Alert.alert("Thông báo", "Bạn có chắc chắn muốn thoát khỏi ứng dụng ?", [
        {
          text: "Hủy",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Thoát", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar />

        <NavigationContainer ref={navigationContainer}>
          <AppStack props={store} />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

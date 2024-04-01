import { NavigationContainer } from "@react-navigation/native";
import React, { useRef } from "react";
import { View, BackHandler, StatusBar } from "react-native";
import { Provider } from "react-redux";

import AppStack from "./router/appScreen";
import store from "./state/store";

export default function AppComponent() {
  const navigationContainer = useRef(null);

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

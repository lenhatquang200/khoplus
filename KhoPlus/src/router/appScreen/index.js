import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { settingApp } from "../../public";

import AuthApp from "../../components/auth/authenScreen";
import TabStack from "../tabStack";

import ProductsTab from "../../components/app/screens/products";

import { screenName } from "../screenName";
const Stack = createStackNavigator();
const optionsHorizontal = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const optionsVertical = {
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export const gestureSetting = {
  gestureEnabled: settingApp.platform === "ios",
  gestureResponseDistance: {
    horizontal: settingApp.width,
    vertical: 300,
  },
};

function AppScreen(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.AUTH_APP}
    >
      <Stack.Screen component={AuthApp} name={screenName.AUTH_APP} />
      <Stack.Screen
        component={TabStack}
        name={screenName.TAB_STACK}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen component={ProductsTab} name={screenName.PRODUCTS_TAB} />
    </Stack.Navigator>
  );
}

export default AppScreen;

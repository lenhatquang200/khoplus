import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { settingApp } from "../../public";

import AuthApp from "../../components/auth/authenScreen";
import TabStack from "../tabStack";

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
      initialRouteName="AuthApp"
    >
      <Stack.Screen component={AuthApp} name="AuthApp" />
      <Stack.Screen
        component={TabStack}
        name="TabStack"
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

export default AppScreen;

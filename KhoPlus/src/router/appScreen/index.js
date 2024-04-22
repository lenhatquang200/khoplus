import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { settingApp } from "../../public";

import AuthApp from "components/auth/authenScreen";
import TabStack from "../tabStack";

// PRODUCTS
import ProductsTab from "components/app/screens/products";
import UploadProducts from "components/app/screens/uploadProducts";

// MANUFACTURINGS
import ManuFactTab from "components/app/screens/manufacturings";
// CUSTOMER
import CustomerTab from "components/app/screens/customer";

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
      <Stack.Screen
        component={UploadProducts}
        name={screenName.UPLOAD_PRODUCTS}
      />

      <Stack.Screen component={ManuFactTab} name={screenName.MANU_FACT_TAB} />
      <Stack.Screen component={CustomerTab} name={screenName.CUSTOMER_TAB} />
    </Stack.Navigator>
  );
}

export default AppScreen;

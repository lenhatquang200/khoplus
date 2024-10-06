import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { settingApp } from "../../public";

import AuthApp from "components/auth/authenScreen";
import TabStack from "../tabStack";
import ScanDomain from "components/auth/component/scanDomain";
// PRODUCTS
import ProductsTab from "components/app/screens/products";
import UploadProducts from "components/app/screens/products/components/uploadProducts";
import DetailProduct from "components/app/screens/products/components/detailProduct";

// MANUFACTURINGS
import ManuFactTab from "components/app/screens/manufacturings";
import ManufactDetail from "components/app/screens/manufacturings/components/manufactDetail";

// CUSTOMER
import CustomerTab from "components/app/screens/customer";
import CustomerDetail from "components/app/screens/customer/component/customerDetail";

//Checkin
import Checkin from "components/app/checkin";
import LeaveList from "components/app/leave";

import DetailProfile from "components/app/detailProfile";
import TakeIDCard from "components/app/detailProfile/components/takeIDCard";

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
      <Stack.Screen component={ScanDomain} name={screenName.SCAN_DOMAIN} />
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
      <Stack.Screen
        component={DetailProduct}
        name={screenName.DETAIL_PRODUCT}
      />

      <Stack.Screen component={ManuFactTab} name={screenName.MANU_FACT_TAB} />
      <Stack.Screen
        component={ManufactDetail}
        name={screenName.MANU_FACT_DETAIL}
      />

      <Stack.Screen component={CustomerTab} name={screenName.CUSTOMER_TAB} />
      <Stack.Screen
        component={CustomerDetail}
        name={screenName.CUSTOMER_DETAIL}
      />

      <Stack.Screen component={Checkin} name={screenName.CHECKIN} />
      <Stack.Screen component={LeaveList} name={screenName.LEAVE} />

      <Stack.Screen component={DetailProfile} name={screenName.DETAIL_PROFILE} />
      <Stack.Screen component={TakeIDCard} name={screenName.TAKE_ID_CARD} />
    </Stack.Navigator>
  );
}

export default AppScreen;

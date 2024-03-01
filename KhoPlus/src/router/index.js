import React from "react";
import {
    createStackNavigator,
    CardStyleInterpolators,
    TransitionPresets,
} from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { settingApp } from "../public";

import AuthApp from "../components/auth/authenScreen";

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

export default function AppStack() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="AutApp"
            >
                <Stack.Screen component={AuthApp} name="AuthApp" />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

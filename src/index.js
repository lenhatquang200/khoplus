import { NavigationContainer } from "@react-navigation/native";
import React, { useRef, useEffect, Suspense } from "react";
import { View, BackHandler, StatusBar, Alert } from "react-native";
import { Provider } from "react-redux";
import { SQLiteProvider } from "expo-sqlite/next";
import AppStack from "./router/appScreen";
import store from "./state/store";
import { navigationRef } from './router';

import { RootSiblingParent } from "react-native-root-siblings";
export default function AppComponent(props) {
    return (
        <View style={{ flex: 1 }}>
            <Provider store={store}>
                <StatusBar />

                <NavigationContainer ref={navigationRef}>
                    <RootSiblingParent>
                        <AppStack props={store} />
                    </RootSiblingParent>
                </NavigationContainer>
            </Provider>
        </View>
    );
}

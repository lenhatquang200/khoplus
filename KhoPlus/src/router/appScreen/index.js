import React from "react";
import {
	createStackNavigator,
	CardStyleInterpolators, TransitionPresets
} from "@react-navigation/stack";
import { settingApp} from '../../public'

import AuthApp from "../../components/auth/authenScreen";

const Stack = createStackNavigator();
const optionsHorizontal = {
	cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const optionsVertical = {
	cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export const gestureSetting = {
	gestureEnabled: settingApp.platform === 'ios',
	gestureResponseDistance: {
		horizontal: settingApp.width,
		vertical: 300
	}
}

function AppScreen(){
    <Stack.Navigator
        initialRouteName="AutApp"
        headerMode={"none"}
    >
        <Stack.Screen component={AuthApp} name="AuthApp"/>

    </Stack.Navigator>
}

export default AppScreen();
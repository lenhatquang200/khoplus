import React, { Component, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

import HomeScreen from "../../components/app/home";
import Category from "../../components/app/category";
import ScanCodeQR from "../../components/app/scanCodeQR";
import History from "../../components/app/history";
import Profile from "../../components/app/profile";
import { colorApp, lottiesJson, settingApp } from "../../public";
import LottieView from "lottie-react-native";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs(props) {
  const lottie = useRef();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="HomeScreen"
      headerMode="none"
    >
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang Chủ",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={focused ? colorApp.blue_primary : colorApp.placeholder}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: "Danh mục",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={focused ? "appstore1" : "appstore-o"}
              color={focused ? colorApp.blue_primary : colorApp.placeholder}
              size={22}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ScanCodeQR"
        component={ScanCodeQR}
        options={{
          tabBarLabel: "ScanCodeQR",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 60,
                height: 60,
                position: "absolute",
                top: -20,
                backgroundColor: colorApp.white,
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
                ...settingApp.shadow,
              }}
            >
              <LottieView
                ref={lottie}
                autoPlay
                renderMode="center"
                source={lottiesJson.qrcode}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "Lịch Sử",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "text-box-check" : "text-box-check-outline"}
              color={focused ? colorApp.blue_primary : colorApp.placeholder}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Cá Nhân",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              color={focused ? colorApp.blue_primary : colorApp.placeholder}
              size={focused ? 26 : 22}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function TabStack() {
  //test_product

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MyTabs"
    >
      <Stack.Screen name="MyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}

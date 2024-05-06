import React, { Component } from "react";
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
import Selling from "../../components/app/selling";
import History from "../../components/app/history";
import Profile from "../../components/app/profile";
import { colorApp, settingApp } from "../../public";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs(props) {
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
              color={focused ? colorApp.green_primary : colorApp.colorPlaceText}
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
              color={focused ? colorApp.green_primary : colorApp.colorPlaceText}
              size={22}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Selling"
        component={Selling}
        options={{
          tabBarLabel: "Bán Hàng",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "truck-fast" : "truck-fast-outline"}
              color={focused ? colorApp.green_primary : colorApp.colorPlaceText}
              size={28}
            />
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
              color={focused ? colorApp.green_primary : colorApp.colorPlaceText}
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
              color={focused ? colorApp.green_primary : colorApp.colorPlaceText}
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

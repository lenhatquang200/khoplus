import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../../components/app/home";
import Category from "../../components/app/category";
import Selling from "../../components/app/history";
import History from "../../components/app/history";
import Profile from "../../components/app/profile";
import { colorApp, settingApp } from "../../public";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function iconTab(focused, name) {
  return (
    <AntDesign
      name={name}
      size={24}
      color={focused ? colorApp.green_primary : colorApp.colorPlaceText}
    />
  );
}

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
          tabBarIcon: ({ focused }) => iconTab(focused, "home"),
        }}
      />

      <Tabs.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: "Danh mục",
          tabBarIcon: ({ focused }) => iconTab(focused, "appstore-o"),
        }}
      />

      <Tabs.Screen
        name="Selling"
        component={Selling}
        options={{
          tabBarLabel: "Bán Hàng",
          tabBarIcon: ({ focused }) => iconTab(focused, "shoppingcart"),
        }}
      />

      <Tabs.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "Lịch Sử",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="manage-history"
              size={24}
              color={focused ? colorApp.green_primary : colorApp.colorPlaceText}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Cá Nhân",
          tabBarIcon: ({ focused }) => iconTab(focused, "profile"),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function TabStack() {
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

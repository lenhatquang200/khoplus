import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet, Text } from "react-native";
import ProductsGroup from "../components/productsGroup";
import ProductsList from "../components/productsList";
import ProductsType from "../components/productsType";
import ProductsUnit from "../components/productsUnit";
import { screenName } from "../../../../router/screenName";
import HeaderProducts from "./comp/header";
import { colorApp, lang, settingApp } from "../../../../public";

const Tabs = createMaterialTopTabNavigator();

function iconTab(focused, name) {
  return (
    <View
      style={{
        minWidth: 120,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: focused ? "transparent" : colorApp.black_opacity_01,
        borderRadius: 20,
        marginBottom: 15,
      }}
    >
      <Text
        style={{
          fontSize: settingApp.size_16,
        }}
      >
        {name}
      </Text>
    </View>
  );
}

function myTab(props) {
  return (
    <Tabs.Navigator
      initialRouteName={props?.route.params?.initRouter}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: styles.indicatorTab,
        tabBarItemStyle: styles.itemTab,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
      }}
      sceneContainerStyle={{ backgroundColor: colorApp.white }}
    >
      <Tabs.Screen
        name={screenName.PRODUCTS_LIST}
        component={ProductsList}
        options={{
          tabBarLabel: lang.list,
          tabBarLabelStyle: {
            fontSize: settingApp.size_18,
            textTransform: "none",
          },
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_TYPE}
        component={ProductsType}
        options={{
          tabBarLabel: lang.type,
          tabBarLabelStyle: {
            fontSize: settingApp.size_18,
            textTransform: "none",
          },
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_GROUP}
        component={ProductsGroup}
        options={{
          tabBarLabel: lang.group,
          tabBarLabelStyle: {
            fontSize: settingApp.size_18,
            textTransform: "none",
          },
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_UNIT}
        component={ProductsUnit}
        options={{
          tabBarLabel: lang.unit,
          tabBarLabelStyle: {
            fontSize: settingApp.size_18,
            textTransform: "none",
          },
        }}
      />
    </Tabs.Navigator>
  );
}

function ProductsTab() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <HeaderProducts />
      {myTab()}
    </View>
  );
}
export default ProductsTab;

const styles = StyleSheet.create({
  mainTan: {},
  indicatorTab: {
    backgroundColor: colorApp.green_opacity_03,
    height: 42,
    borderRadius: 22,
  },
  itemTab: {
    height: 42,
    marginTop: 10,
  },
});

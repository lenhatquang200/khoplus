import React, { useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet } from "react-native";
import ProductsGroup from "./components/productsGroup";
import ProductsList from "./components/productsList";
import ProductsType from "./components/productsType";
import ProductsUnit from "./components/productsUnit";
import { screenName } from "../../../../router/screenName";
import { colorApp, lang, settingApp } from "../../../../public";
import { HeaderSearch } from "../../../../public/component";

const Tabs = createMaterialTopTabNavigator();

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
          tabBarLabelStyle: styles.label_style,
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_TYPE}
        component={ProductsType}
        options={{
          tabBarLabel: lang.type,
          tabBarLabelStyle: styles.label_style,
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_GROUP}
        component={ProductsGroup}
        options={{
          tabBarLabel: lang.group,
          tabBarLabelStyle: styles.label_style,
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_UNIT}
        component={ProductsUnit}
        options={{
          tabBarLabel: lang.unit,
          tabBarLabelStyle: styles.label_style,
        }}
      />
    </Tabs.Navigator>
  );
}

function ProductsTab(props) {
  function goBack() {
    props?.navigation.goBack();
  }

  function onSearchValue(value) {}

  return (
    <View style={styles.main}>
      <HeaderSearch
        goBack={goBack}
        title={lang.product}
        placeholder={lang.placeSearchProduct}
        onSearch={onSearchValue}
      />
      {myTab(props)}
    </View>
  );
}
export default ProductsTab;

const styles = StyleSheet.create({
  main: { flex: 1 },
  indicatorTab: {
    backgroundColor: colorApp.green_opacity_03,
    height: 36,
    borderRadius: 22,
  },
  itemTab: {
    height: 42,
  },
  label_style: {
    fontSize: settingApp.size_16,
    textTransform: "none",
  },
});

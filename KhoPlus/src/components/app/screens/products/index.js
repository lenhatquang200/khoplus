import React, { useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import ProductsGroup from "./components/productsGroup";
import ProductsList from "./components/productsList";
import ProductsType from "./components/productsType";
import ProductsUnit from "./components/productsUnit";
import { screenName } from "../../../../router/screenName";
import { colorApp, lang, settingApp } from "../../../../public";
import { HeaderSearch } from "../../../../public/component";

const Tabs = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  const flatList = useRef(null);
  const listRourter = state?.routes || [];

  function renderItemTab(obj, descriptors, navigation) {
    const { item, index } = obj;
    const isFocused = state.index === index;
    const { options } = descriptors[item.key] || {};
    const label =
      options?.tabBarLabel !== undefined
        ? options?.tabBarLabel
        : options?.title !== undefined
        ? options?.title
        : item?.name;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: item.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(item.name, item.params);
      }
      setTimeout(() => {
        flatList.current.scrollToIndex({
          animated: true,
          index: index,
          viewPosition: 0.5,
        });
      }, 200);
    };

    return (
      <TouchableOpacity
        key={index}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={item?.name}
        testID={item.key}
        onPress={() => onPress(index)}
        style={[
          styles.item_Tab,
          {
            backgroundColor: isFocused
              ? colorApp.green_opacity_03
              : colorApp.black_opacity_01,
            marginLeft: index == 0 ? settingApp.space_16 : settingApp.space_8,
            marginRight: index == 3 ? settingApp.space_16 : 0,
          },
        ]}
      >
        <Animated.Text
          style={{
            fontSize: settingApp.size_16,
            color: isFocused ? colorApp.colorText : colorApp.colorPlaceText,
            fontWeight: isFocused ? "bold" : "normal",
          }}
        >
          {label}
        </Animated.Text>
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: colorApp.white,
      }}
    >
      <FlatList
        ref={flatList}
        horizontal
        extraData={state}
        keyExtractor={(item, index) => index + ""}
        data={listRourter}
        renderItem={(obj) => renderItemTab(obj, descriptors, navigation)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function myTab(props) {
  return (
    <Tabs.Navigator
      initialRouteName={props?.route.params?.initRouter}
      screenOptions={{
        tabBarScrollEnabled: false,
        tabBarIndicatorStyle: styles.indicatorTab,
        tabBarItemStyle: styles.itemTab,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
      }}
      sceneContainerStyle={{ backgroundColor: colorApp.white }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen
        name={screenName.PRODUCTS_LIST}
        component={ProductsList}
        key={screenName.PRODUCTS_LIST}
        options={{
          tabBarLabel: lang.group,
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_GROUP}
        component={ProductsGroup}
        key={screenName.PRODUCTS_LIST}
        options={{
          tabBarLabel: lang.list,
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_TYPE}
        component={ProductsType}
        key={screenName.PRODUCTS_LIST}
        options={{
          tabBarLabel: lang.type,
        }}
      />
      <Tabs.Screen
        name={screenName.PRODUCTS_UNIT}
        component={ProductsUnit}
        key={screenName.PRODUCTS_LIST}
        options={{
          tabBarLabel: lang.unit,
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
  item_Tab: {
    minWidth: 100,
    height: 36,

    justifyContent: "center",
    alignItems: "center",
    paddingLeft: settingApp.space_10,
    paddingRight: settingApp.space_10,
    borderRadius: 42 / 2,
  },
});

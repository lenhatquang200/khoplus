import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Component, colorApp, imageApp, settingApp } from "../../../public";
import HeaderHome from "./component/headerHome";
import { LinearBackGround, SafeEra } from "public/component";

function HomeScreen(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);


  return (
    <SafeEra style={styles.container}>
      <ScrollView>
        <View style={styles.viewBanner}>
          <Image source={imageApp.bannerHome} style={{width:settingApp.width_32, height:160, borderRadius:8,}} resizeMode={"cover"} />
        </View>
        <HeaderHome colleague={colleague} />
      </ScrollView>
    </SafeEra>

  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colorApp.white
  },
  statusBar: {
    width: settingApp.width,
    height: settingApp.statusBarHeight,
  },

  viewBanner:{
    width: settingApp.width,
    height:162,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    overflow:'hidden'
  }
});

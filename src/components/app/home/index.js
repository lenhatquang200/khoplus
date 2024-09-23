import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { colorApp, imageApp, settingApp } from "../../../public";
import HeaderHome from "./component/headerHome";
import { SafeEra } from "public/component";
import { ApiCall } from "KhoPlus";
import ChartReport from "./component/chartReport";
import CheckinInfo from "./component/CheckinInfo";

function HomeScreen(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);

  return (
    <SafeEra style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.viewBanner}>
          <Image source={imageApp.bannerHome} style={{width:settingApp.width_32, height:160, borderRadius:8,}} resizeMode={"cover"} />
        </View>
        <HeaderHome colleague={colleague} />
        <CheckinInfo  colleague={colleague} />    
        <ChartReport colleague={colleague} />

        <View 
          style={{
            width:settingApp.width,
            height:60
          }}
        />
      </ScrollView>
    </SafeEra>

  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colorApp.white_snow
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
    overflow:'hidden',
    marginTop:24
  }
});

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { settingApp, colorApp } from "../../../public";

const tablet = settingApp?.isTablet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    flex: 1,
    zIndex: 100,
    paddingTop: tablet ? settingApp.scale(5) : 0,
  },
  viewTabContainer: {
    width: settingApp.width,
    backgroundColor: "transparent",
    // paddingTop: tablet ? 0 : 25,
    // paddingBottom: tablet ? 0 : 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  viewHeaderFooter: {
    width: settingApp.width,
    backgroundColor: "transparent",
  },
  viewFlatlistContent: {
    flex: 1,
    zIndex: 100,
    // paddingTop: tablet ? settingApp.scale(5) : 0,
  },
  itemMenuContainer: {
    height: tablet ? settingApp.scale(32) : 32,
    backgroundColor: "transparent",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  viewItemMenu: {
    height: tablet ? settingApp.scale(32) : 32,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  textItemMenu: {
    fontSize: tablet ? settingApp.size_12 : settingApp.size_14,
    fontWeight: "500",
  },
});

export default styles;

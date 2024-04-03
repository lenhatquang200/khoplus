import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { settingApp, colorApp } from "../../../public";

const tablet = settingApp?.isTablet;

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    zIndex: 100,
    marginTop: tablet ? settingApp.scale(48) : 68,
    paddingTop: tablet ? settingApp.scale(5) : 0,
  },
});

export default styles;

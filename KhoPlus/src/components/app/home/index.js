import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { Component, colorApp } from "../../../public";
import { ApiCall } from "../../../KhoPlus";

function HomeScreen(props) {
  const colleague = useSelector((state) => state?.app?.colleague);

  useEffect(() => {
    getApi();
  }, []);

  async function getApi() {
    const rest = await ApiCall.getListProduct();
    if (rest?.data) {
    }
  }

  return (
    <View style={styles.container}>
      <Component.LinearBackGround />

      <MaterialCommunityIcons
        name="office-building-cog"
        size={100}
        color={colorApp.colorPlaceText}
      />
      <Text>Tính năng đang được xây dựng</Text>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

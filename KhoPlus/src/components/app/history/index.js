import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Component, colorApp } from "../../../public";
import { useSQLiteContext } from "expo-sqlite/next";

function History(props) {
  const colleague = useSelector((state) => state?.app?.colleague);
  const db = useSQLiteContext();

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    const res = await db.getAllAsync(
      `SELECT * FROM test_product WHERE id = ?`,
      "test_product_!"
    );

    console.log("getdata", res);
    let data_ = res[0]?.value;
    if (data_) {
      data_ = JSON.parse(data_);
      console.log("getdata pasre", data_);
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
export default History;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

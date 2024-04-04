import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { Component, colorApp } from "../../../public";
import { ApiCall } from "../../../KhoPlus";
import { useSQLiteContext, deleteDatabaseAsync } from "expo-sqlite/next";

//test_product
function HomeScreen(props) {
  const colleague = useSelector((state) => state?.app?.colleague);
  const db = useSQLiteContext();

  useEffect(() => {
    createTable();
    getApi();
    insertDB();
  }, []);

  async function createTable() {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS test_product (id TEXT PRIMARY KEY, value TEXT);`
    );
  }

  async function insertDB() {
    await db.execAsync(
      `INSERT INTO test_product (id, value) VALUES (?, ?)`,
      `test_product_!`,
      `${JSON.stringify(colleague)}`
    );
  }

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

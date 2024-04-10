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
import { Component, colorApp } from "../../../../../../public";

function ProductsUnit(props) {
  return (
    <View style={styles.container}>
      <Text>ProductsUnit</Text>
    </View>
  );
}
export default ProductsUnit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

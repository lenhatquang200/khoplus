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

function ProductsGroup(props) {
  return (
    <View style={styles.container}>
      <Text>ProductGroup</Text>
    </View>
  );
}
export default ProductsGroup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

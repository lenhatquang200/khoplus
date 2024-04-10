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
import { LoadingInContent } from "../../../../../../public/component";

function ProductsList(props) {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>{isLoading && <LoadingInContent />}</View>
  );
}
export default ProductsList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

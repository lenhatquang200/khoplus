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
import { colorApp } from "../../../../../../public";
import {
  LoadingInContent,
  Nonedata,
  Loadmore,
} from "../../../../../../public/component";
import { ApiCall } from "../../../../../../KhoPlus";

let current_page = 1;
function ProductsUnit(props) {
  const limit = 10;
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);

  return (
    <View style={styles.container}>{isLoading && <LoadingInContent />}</View>
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

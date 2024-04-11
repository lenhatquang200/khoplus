import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  ToastShow,
  colorApp,
  lang,
  settingApp,
} from "../../../../../../public";
import { LoadingInContent } from "../../../../../../public/component";
import { ApiCall } from "../../../../../../KhoPlus";
import Item from "./component/item";

let current_page = 1;
function ProductsGroup(props) {
  const limit = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const result = await ApiCall.getGroupProduct(current_page, limit);
    let newList = [];
    if (result?.data?.length > 0) {
      if (current_page == 1) {
        newList = result?.data;
      } else {
        newList = [...listData, ...result?.data];
      }
    } else {
      newList = listData;
      ToastShow(lang.fetchApiFail);
    }
    setListData(newList);
    setIsLoading(false);
  }

  function onRefresh() {}

  function onLoadMore() {}

  return (
    <View style={styles.container}>
      {isLoading && <LoadingInContent />}

      {!isLoading && listData?.length == 0 ? (
        <Nonedata lable={lang.listEmpty} />
      ) : (
        <FlatList
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
          extraData={listData}
          keyExtractor={(item, index) => item?.id + index + ""}
          data={listData}
          renderItem={(obj) => <Item obj={obj} />}
          style={{ paddingTop: 12 }}
          ListFooterComponent={() =>
            !isLoadMore ? (
              <View style={styles.footer} />
            ) : (
              <Component.Loadmore width={settingApp.width_32} height={80} />
            )
          }
          onEndReached={() => onLoadMore()}
          onEndReachedThreshold={0.1}
        />
      )}
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
  footer: {
    width: settingApp.width_32,
    height: 60,
    backgroundColor: "transparent",
  },
});

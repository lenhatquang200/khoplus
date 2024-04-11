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
import {
  LoadingInContent,
  Loadmore,
  Nonedata,
} from "../../../../../../public/component";
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
  }, [isLoadMore, refreshing]);

  async function loadData() {
    let newList = listData;
    const result = await ApiCall.getGroupProduct(current_page, limit);
    if (result?.data?.length != 0) {
      if (current_page == 1) {
        newList = result?.data;
      } else {
        result?.data?.map((item) => {
          const index_ = newList.findIndex((e) => e?.id == item?.id);
          if (index_ < 0) {
            newList.push(item);
          }
        });
      }
    } else {
      newList = newList;
    }
    setListData(newList);
    setIsLoading(false);
    setRefreshing(false);
    setIsLoadmore(false);
  }

  function onRefresh() {
    setRefreshing(true);
  }

  function onLoadMore() {
    setIsLoadmore(true);
    current_page = current_page + 1;
  }

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
              <Loadmore width={settingApp.width_32} height={80} />
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

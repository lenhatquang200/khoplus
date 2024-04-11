import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import {
  Component,
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
import Item from "./componenst/Item";

let current_page = 1;

function ProductsList(props) {
  const limit = 10;
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);

  useEffect(() => {
    loadData();
  }, [isLoadMore, refreshing]);

  async function loadData() {
    let newList = [];
    const result = await ApiCall.getListProduct(current_page, limit);
    if (result?.data?.length != 0) {
      if (current_page == 1) {
        newList = result?.data;
      } else {
        newList = [...listData, ...result?.data];
      }
    } else {
      newList = newList;
    }
    setListData(newList);
    setIsLoading(false);
    setRefreshing(false);
    setIsLoadmore(false);
  }

  async function onDelete(item) {
    const { id } = item;
    const result = await ApiCall.deleteOneProductsGroup(id);
    if (result?.success) {
      let newListDelelte = [...listData];
      const index_delete = newListDelelte.findIndex((e) => e.id == id);
      if (index_delete > -1) {
        newListDelelte.splice(index_delete, 1);
        setListData(newListDelelte);
        ToastShow(result?.message);
      }
    }
  }

  function onRefresh() {
    setRefreshing(true);
    current_page = 1;
  }

  function onLoadMore() {
    current_page = current_page + 1;
    setIsLoadmore(true);
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
          keyExtractor={(item, index) => item?.id}
          data={listData}
          renderItem={(obj) => <Item obj={obj} onDelete={onDelete} />}
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

export default ProductsList;
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

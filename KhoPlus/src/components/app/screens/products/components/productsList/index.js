import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, FlatList, Alert, ScrollView } from "react-native";
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
import Item from "./component/item";

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
    let newList = listData;
    const result = await ApiCall.getListProduct(current_page, limit);
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

  function alertDelete(item) {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa sản phẩm này ?", [
      {
        text: "Hủy",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Xóa", onPress: () => onDelete(item) },
    ]);
    return true;
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
          renderItem={(obj) => <Item obj={obj} onDelete={alertDelete} />}
          style={{ paddingTop: 12 }}
          ListFooterComponent={() =>
            !isLoadMore ? (
              <View style={styles.footer} />
            ) : (
              <Loadmore width={settingApp.width_32} height={80} />
            )
          }
          onEndReached={() => onLoadMore()}
          onEndReachedThreshold={5}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          removeClippedSubviews={true}
        />
        // <ScrollView>
        //   {listData.map((item, index) => {
        //     return <Item obj={{ item, index }} onDelete={alertDelete} />;
        //   })}
        // </ScrollView>
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

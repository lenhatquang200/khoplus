import { ApiCall } from "KhoPlus";
import { colorApp, settingApp } from "public";
import {
  FloatButtonAdd,
  LoadingInContent,
  Loadmore,
  Nonedata,
} from "public/component";
import React, { useEffect, useState } from "react";
import { View, RefreshControl, StyleSheet, FlatList } from "react-native";
import { screenName } from "router/screenName";
import Item from "./component/item";

export default function CustomerList(props) {
  let current_page = 1;
  let total_page = null;

  const limit = 10;
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    let newList = listData;
    if (!total_page || (total_page && current_page <= total_page)) {
      const result = await ApiCall.getListCustomer(current_page);
      if (result?.data?.length != 0) {
        total_page = result?.total_page;
        if (current_page == 1) {
          newList = result?.data;
        } else {
          result?.data?.map((item) => {
            const index_ = newList.findIndex((e) => e?._id == item?._id);
            if (index_ < 0) {
              newList.push(item);
            }
          });
        }
      } else {
        newList = newList;
      }
    } else {
    }

    setListData(newList);
    setIsLoading(false);
    setRefreshing(false);
    setIsLoadmore(false);
  }

  function onRefresh() {
    setRefreshing(true);
    current_page = 1;
    total_page = null;
    loadData();
  }

  function onLoadMore() {
    if (!total_page || (total_page && current_page == total_page)) {
      setIsLoadmore(false);
    } else {
      current_page += 1;
      setIsLoadmore(true);
    }

    loadData();
  }

  function alertDelete() {}

  function onUpdateItem() {}

  return (
    <View style={styles.container}>
      {isLoading && <LoadingInContent />}
      {!isLoading && listData?.length == 0 ? (
        <Nonedata lable={lang.listEmpty} />
      ) : (
        <FlatList
          extraData={listData}
          keyExtractor={(item, index) => item?._id + index + ""}
          data={listData}
          renderItem={(obj) => (
            <Item
              obj={obj}
              onDelete={alertDelete}
              onUpdateItem={onUpdateItem}
              gotoDetail={(item) =>
                props?.navigation?.navigate(screenName.DETAIL_PRODUCT, { item })
              }
            />
          )}
          style={{ paddingTop: 12 }}
          ListFooterComponent={() =>
            !isLoadMore ? (
              <View style={styles.footer} />
            ) : (
              <Loadmore width={settingApp.width} height={80} />
            )
          }
          onEndReached={() => onLoadMore()}
          onEndReachedThreshold={5}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              tintColor={colorApp.blue_primary}
            />
          }
        />
      )}

      {!isLoading && (
        <FloatButtonAdd
          onPress={() =>
            props?.navigation?.navigate(screenName.UPLOAD_PRODUCTS)
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: settingApp.width_32,
    height: 120,
    backgroundColor: "transparent",
  },
  view_Add: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 40,
    backgroundColor: colorApp.green_002,
    bottom: 32,
    right: 16,
    ...settingApp.shadow_Item,
  },
});

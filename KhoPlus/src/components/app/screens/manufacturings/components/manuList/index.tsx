import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  LoadingInContent,
  Loadmore,
  Nonedata,
} from "../../../../../../public/component";
import { ApiCall } from "../../../../../../KhoPlus";
import Item from "./componentList/item";
import { colorApp, settingApp } from "../../../../../../public";
import { MaterialIcons } from "@expo/vector-icons";

export interface Iprops {
}

let current_page = 1;
let page = 1;
export default function ManuList(props:Iprops) {
  const limit = 10;
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadmore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isLoadMore || isLoading) {
      loadData();
    }
  }, [isLoadMore, isLoading]);

  async function loadData() {
    let newList:any = [];
    newList = listData
    const result = await ApiCall.getManufacturingList(current_page, limit);
    if (result?.data?.length != 0) {
      if (current_page == 1) {
        newList = result?.data;
      } else {
        result?.data?.map((item: any) => {
          const index_ = newList.findIndex((e:any) => e?.id == item?.id);
          if (index_ < 0) {
            let newItem:any = {}
            newItem = item
            newList.push(newItem);
          }
        });
      }
    } else {
      newList = newList;
    }
    setListData(newList);
    setIsLoading(false);
    setIsLoadmore(false);
    setRefreshing(false);
  }

  function onLoadMore() {
    current_page += 1;
    setIsLoadmore(true);
  }

  function renderAddItem() {
    return (
      <TouchableOpacity
        // onPress={() => props?.navigation?.navigate(screenName.UPLOAD_PRODUCTS)}
        style={styles.view_Add}
      >
        <MaterialIcons name="add" color={colorApp.white} size={40} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && <LoadingInContent/>}
      {!isLoading && listData?.length == 0 ? (
        <Nonedata />
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item?:any, index?:any) => item?.id}
          renderItem={(obj?:Object) => <Item obj={obj} />}
          style={{ paddingTop: 12 }}
          ListFooterComponent={() =>
            !isLoadMore ? (
              <View style={styles.footer} />
            ) : (
              <Loadmore width={settingApp.width} height={80} />
            )
          }
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          removeClippedSubviews={true}
          onEndReached={() => onLoadMore()}
        />
      )}
      {!isLoading && renderAddItem()}
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
    width: settingApp.width,
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

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import {
  FloatButtonAdd,
  LoadingInContent,
  Loadmore,
  Nonedata,
} from "../../../../../../public/component";
import { ApiCall } from "../../../../../../KhoPlus";
import Item from "./componentList/item";
import {
  ToastShow,
  colorApp,
  lang,
  settingApp,
} from "../../../../../../public";
import { MaterialIcons } from "@expo/vector-icons";
import { screenName } from "router/screenName";
import actions from "state/actions";

export default function ManuList(props) {
  let current_page = 1;
  let total_page = null;
  const dispatch = useDispatch();
  const newItemUpdate = useSelector((state) => state?.app?.updateItemManuFact);
  const limit = 10;
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadmore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isLoading) {
      loadData();
    }
  }, [isLoading]);

  useEffect(() => {
    if (newItemUpdate?._id) {
      updateListItem(newItemUpdate);
    }
  }, [newItemUpdate]);

  function updateListItem(newItemUpdate) {
    let newList = [...listData];
    const _index = newList.findIndex((item) => item?._id == newItemUpdate?._id);
    if (_index !== -1) {
      if (newItemUpdate?.isDelete) {
        newList.splice(_index, 1);
      } else {
        newList[_index] = newItemUpdate;
      }
    } else {
      newList.unshift(newItemUpdate);
    }
    dispatch(actions.updateItemManuFact(null));
    setListData(newList);
  }

  async function loadData() {
    let newList = listData;
    const result = await ApiCall.getManufacturingList(current_page, limit);
    if (result?.data?.length != 0) {
      total_page = result?.total_page;
      if (current_page == 1) {
        newList = result?.data;
      } else {
        result?.data?.map((item) => {
          const index_ = newList.findIndex((e) => e?._id == item?._id);
          if (index_ < 0) {
            let newItem = {};
            newItem = item;
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
    if (!total_page || (total_page && current_page == total_page)) {
      setIsLoadmore(false);
    } else {
      current_page += 1;
      setIsLoadmore(true);
      loadData();
    }
  }

  function confirmDelete(item) {
    Alert.alert(lang.aler, lang.deleteManu, [
      {
        text: lang.cancel,
        onPress: () => null,
        style: "cancel",
      },
      { text: lang.accept, onPress: () => _onDeleteItem(item) },
    ]);
  }

  async function _onDeleteItem(item) {
    const result = await ApiCall.deleteManufacturing(item?._id);
    if (result?.data?.acknowledged) {
      let newListDelelte = [...listData];
      const index_delete = newListDelelte.findIndex((e) => e._id == item?._id);
      if (index_delete > -1) {
        newListDelelte.splice(index_delete, 1);
        setListData(newListDelelte);
        ToastShow(result?.message);
      }
    } else {
      ToastShow(`${lang.delete} ${lang.failed}`);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading && <LoadingInContent />}
      {!isLoading && listData?.length == 0 ? (
        <Nonedata />
      ) : (
        <FlatList
          extraData={listData}
          data={listData}
          keyExtractor={(item, index) => item?._id}
          renderItem={(obj) => (
            <Item obj={obj} props={props} onDelete={confirmDelete} />
          )}
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
      {!isLoading && (
        <FloatButtonAdd
          onPress={() =>
            props?.navigation?.navigate(screenName.MANU_FACT_DETAIL)
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

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { ToastShow, lang, settingApp } from "public";
import {
  FloatButtonAdd,
  LoadingInContent,
  Loadmore,
  Nonedata,
} from "public/component";
import { ApiCall } from "KhoPlus";
import Item from "./component/item";
import ModalUpdate from "../modalUpdate/modalUpdate";
import CONSTANT from "../../CONST";
import actions from "state/actions";

function ProductsGroup(props) {
  let current_page = 1;
  let total_page = null;

  const dispatch = useDispatch();

  const limit = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  useEffect(() => {
    loadData();
  }, [isLoadMore, refreshing]);

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
    dispatch(actions.updateGroupProduct(null));
    setListData(newList);
  }

  async function loadData() {
    let newList = listData;
    if (!total_page || (total_page && current_page <= total_page)) {
      const result = await ApiCall.getGroupProduct(current_page, limit);
      if (result?.data?.length != 0) {
        total_page = result?.total_page;
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
    } else {
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
    if (!total_page || (total_page && current_page == total_page)) {
      setIsLoadmore(false);
    } else {
      current_page += 1;
      setIsLoadmore(true);
    }
  }

  function _onUpdate(item) {
    setDataUpdate(item);
    setVisible(true);
  }

  function _onClose() {
    setDataUpdate(null);
    setVisible(false);
  }

  function confirmDelete(item) {
    Alert.alert(lang.aler, lang.deleteGroupProduct, [
      {
        text: lang.cancel,
        onPress: () => null,
        style: "cancel",
      },
      { text: lang.accept, onPress: () => _onDelete(item) },
    ]);
  }

  async function _onDelete(item) {
    const result = await ApiCall.deleteProduct_Group(item?.id);
    if (result?.success) {
      updateListItem({ ...item, isDelete: true });
      ToastShow(result?.message);
    } else {
      ToastShow(`${lang.delete} ${lang.failed}`);
    }
  }

  async function _onUpdateGroup(item) {
    let result = null;
    let body = {
      name: item?.name,
    };
    if (item?._id) {
      result = await ApiCall.updateProduct_Group(item?._id, body);
    } else {
      result = await ApiCall.createProduct_Group(body);
    }

    if (result?.success && result?.data?._id) {
      updateListItem(result?.data);
      ToastShow(result?.message);
      _onClose();
    } else {
      ToastShow(`${lang.save} ${lang.failed}`);
    }
    setIsLoading(false);
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
          renderItem={(obj) => (
            <Item obj={obj} _onUpdate={_onUpdate} _onDelete={confirmDelete} />
          )}
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
      {!isLoading && <FloatButtonAdd onPress={() => setVisible(true)} />}
      <ModalUpdate
        onClose={() => _onClose()}
        isVisible={isVisible}
        dataUpdate={dataUpdate}
        type={CONSTANT.GROUP_PRODUCT}
        _onUpdateGroup={_onUpdateGroup}
      />
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
    height: 120,
    backgroundColor: "transparent",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { ToastShow, colorApp, lang, settingApp } from "public";
import {
  LoadingInContent,
  Nonedata,
  Loadmore,
  FloatButtonAdd,
} from "public/component";
import { ApiCall } from "KhoPlus";
import Item from "./component/item";
import ModalUpdate from "../modalUpdate/modalUpdate";
import CONSTANT from "../../CONST";

function ProductsType(props) {
  let current_page = 1;
  let total_page = null;

  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

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
    setListData(newList);
  }

  async function loadData() {
    let newList = listData;
    if (!total_page || (total_page && current_page <= total_page)) {
      const result = await ApiCall.getTypeProduct(current_page);
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
    total_page = null;
    current_page = 1;
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

  function confirmDelete(item) {
    Alert.alert(lang.aler, lang.deleteTypeProduct, [
      {
        text: lang.cancel,
        onPress: () => null,
        style: "cancel",
      },
      { text: lang.accept, onPress: () => _onDelete(item) },
    ]);
  }

  function _onUpdate(item) {
    setDataUpdate(item);
    setVisible(true);
  }

  function _onClose() {
    setDataUpdate(null);
    setVisible(false);
  }

  async function _onUpdateType(item) {
    let result = null;
    let body = {
      name: item?.name,
    };
    if (item?._id) {
      result = await ApiCall.updateProduct(
        item?._id,
        { ...body, _id: item?._id },
        CONSTANT.TYPE_PRODUCT
      );
    } else {
      result = await ApiCall.createProduct(body, CONSTANT.TYPE_PRODUCT);
    }
    if (result?.data?._id) {
      updateListItem(result?.data);
      ToastShow(result?.message);
      _onClose();
    } else {
      ToastShow(`${lang.save} ${lang.failed}`);
    }
    setIsLoading(false);
  }

  async function _onDelete(item) {
    const result = await ApiCall.deleteProduct(
      item?._id,
      CONSTANT.GROUP_PRODUCT
    );
    if (result?.data?.acknowledged) {
      updateListItem({ ...item, isDelete: true });
      ToastShow(result?.message);
    } else {
      ToastShow(`${lang.delete} ${lang.failed}`);
    }
  }

  function _onClose() {
    setDataUpdate(null);
    setVisible(false);
  }

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
          onEndReachedThreshold={10}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              tintColor={colorApp.blue_primary}
            />
          }
        />
      )}

      {!isLoading && <FloatButtonAdd onPress={() => setVisible(true)} />}

      <ModalUpdate
        isVisible={isVisible}
        onClose={() => _onClose()}
        type={CONSTANT.TYPE_PRODUCT}
        dataUpdate={dataUpdate}
        _onUpdateGroup={_onUpdateType}
        title={lang.type}
      />
    </View>
  );
}
export default ProductsType;
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

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { settingApp, lang, ToastShow } from "public";
import { LoadingInContent, Nonedata, Loadmore, FloatButtonAdd } from "public/component";
import { ApiCall } from "KhoPlus";
import Item from "./component/item";
import ModalUpdate from "../modalUpdate/modalUpdate";
import CONSTANT from "../../CONST";

function ProductsUnit(props) {
    let current_page = 1;
    let total_page = null;
    const limit = 10;
    const [listData, setListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadMore, setIsLoadmore] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

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
            const result = await ApiCall.getUnitProduct(current_page);
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

        loadData();
    }

    function onLoadMore() {
        if (!total_page || (current_page == total_page)) {
            setIsLoadmore(false);
        } else {
            current_page += 1;
            setIsLoadmore(true);
            loadData();
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

    async function _onUpdateGroup(item) {
        let result = null;
        let body = {
            name: item?.name,
        };
        if (item?._id) {
            result = await ApiCall.updateProduct(item?._id, { ...body, _id: item?._id, }, CONSTANT.UNIT_PRODUCT);
        } else {
            result = await ApiCall.createProduct(body, CONSTANT.UNIT_PRODUCT);
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

    function confirmDelete(item) {
        Alert.alert(lang.aler, lang.deleteUnitProduct, [
            {
                text: lang.cancel,
                onPress: () => null,
                style: "cancel",
            },
            { text: lang.accept, onPress: () => _onDelete(item) },
        ]);
    }

    async function _onDelete(item) {
        const result = await ApiCall.deleteProduct(item?._id, CONSTANT.UNIT_PRODUCT);
        if (result?.data?.acknowledged) {
            updateListItem({ ...item, isDelete: true });
            ToastShow(result?.message);
        } else {
            ToastShow(`${lang.delete} ${lang.failed}`);
        }
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
                    keyExtractor={(item, index) => item?._id + index + ""}
                    data={listData}
                    renderItem={(obj) => <Item obj={obj} _onUpdate={_onUpdate} _onDelete={confirmDelete} />}
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
                />
            )}

            {!isLoading && <FloatButtonAdd onPress={() => setVisible(true)} />}
            <ModalUpdate
                onClose={() => _onClose()}
                isVisible={isVisible}
                dataUpdate={dataUpdate}
                type={CONSTANT.UNIT_PRODUCT}
                _onUpdateGroup={_onUpdateGroup}
                title={lang.unit}
            />
        </View>
    );
}
export default ProductsUnit;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        width: settingApp.width_32,
        height: 100,
        backgroundColor: "transparent",
    },
});

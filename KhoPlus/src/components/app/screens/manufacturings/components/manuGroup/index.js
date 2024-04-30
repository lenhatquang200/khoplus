import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { ApiCall } from "KhoPlus";
import { LoadingInContent, Loadmore, Nonedata } from "public/component";
import Item from "./component/item";
import { ToastShow, colorApp, lang, settingApp } from "public";
import ModalUpdate from "./component/modalUpdate";

let current_page = 1
export default function ManuGroup(props) {
    const newItemUpdate = useSelector((state) => state?.app?.updateItemManuFact);
    const limit = 10;
    const [listData, setListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMore, setIsLoadmore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isVisible, setIsVisible] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        let newList = listData;
        const result = await ApiCall.getManufacturingGroup(current_page, limit)
        if (result?.data?.length != 0) {
            if (current_page == 1) {
                newList = result?.data;
            } else {
                result?.data?.map((item) => {
                    const index_ = newList.findIndex((e) => e?.id == item?.id);
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

    }


    function confirmDelete(item) {
        Alert.alert(lang.aler, lang.deleteManu, [
            {
                text: lang.cancel,
                onPress: () => null,
                style: "cancel",
            },
            { text: lang.accept, onPress: () => _onDeleteItem(item) },
        ])
    }

    async function _onDeleteItem(item) {
        const result = await ApiCall.deleteManufact_Group(item?.id)
        if (result?.success) {
            let newListDelelte = [...listData];
            const index_delete = newListDelelte.findIndex((e) => e.id == item?.id);
            if (index_delete > -1) {
                newListDelelte.splice(index_delete, 1);
                setListData(newListDelelte);
                ToastShow(result?.message)
            }
            ToastShow(result?.message)
        }
        else {
            ToastShow(`${lang.delete} ${lang.failed}`)
        }
    }

    function updateManuFact() {

    }


    return (
        <View
            style={styles.container}>
            {isLoading && <LoadingInContent />}
            {!isLoading && listData?.length == 0 ? (
                <Nonedata />
            ) : (
                <FlatList
                    extraData={listData}
                    data={listData}
                    keyExtractor={(item, index) => item?.id}
                    renderItem={(obj) =>
                        <Item
                            obj={obj}
                            props={props}
                            onDelete={confirmDelete}
                            onUpdate={() => setIsVisible(true)}
                        />}
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
            {/* {!isLoading && renderAddItem()} */}

            <ModalUpdate
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                dataUpdate={dataUpdate}
            />
        </View>)
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
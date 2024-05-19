import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    FlatList,
} from "react-native";
import { colorApp, lang, settingApp } from "public";
import {
    HeaderName,
    Nonedata,
    Loadmore,
    LoadingInContent,
} from "public/component";
import Constanst from "./constans";
import { ApiCall } from "KhoPlus";

export default function ModalSearch(props) {
    let current_page = 1;
    let total_page = null;
    let list_Data = [];

    const { type, onUpdateField, dataField = {} } = props || {};
    let titleHaeder =
        type == Constanst.UNIT
            ? lang.unit
            : type == Constanst.TYPE
                ? lang.type
                : lang.group;

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMore, setIsLoadmore] = useState(false);
    const [listData, setListData] = useState(list_Data);

    useEffect(() => {
        if (props?.type) {
            setIsLoading(true);
            setListData([]);
            loadData();
        }
    }, [props?.type]);

    async function loadData() {
        let newList = listData;
        if (!total_page || (total_page && current_page <= total_page)) {
            const result = await getApiByType(type);
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
        setIsLoadmore(false);
    }

    async function getApiByType(type) {
        if (type == Constanst.GROUP) {
            return await ApiCall.getGroupProduct(current_page);
        } else if (type == Constanst.UNIT) {
            return await ApiCall.getUnitProduct(current_page);
        } else if (type == Constanst.TYPE) {
            return await ApiCall.getTypeProduct(current_page);
        } else {
            return null;
        }
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

    function renderItem(obj) {
        const { index, item } = obj;
        let isCheck = item?._id === dataField?._id;
        return (
            <View style={styles.view_bt} key={index}>
                <TouchableOpacity
                    onPress={() => updateField(item, type)}
                    style={[
                        styles.bt_item,
                        {
                            backgroundColor: isCheck
                                ? colorApp?.green_opacity_03
                                : colorApp.white,
                        },
                    ]}
                >
                    <Text style={styles.txt_item}>{item?.name}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
            </View>
        );
    }

    function _closeModal() {
        setIsLoading(true);
        setListData([]);
        props?.onClose();
    }

    function updateField(item, type) {
        setIsLoading(true);
        setListData([]);
        onUpdateField(item, type);
    }

    return (
        <Modal visible={props?.isVisible} transparent={true} animationType="slide">
            <HeaderName goBack={_closeModal} title={titleHaeder} />

            <View style={styles.container}>
                <View style={styles.line} />
                {isLoading && <LoadingInContent />}
                {!isLoading && listData?.length == 0 ? (
                    <Nonedata lable={lang.listEmpty} />
                ) : (
                    <FlatList
                        extraData={listData}
                        keyExtractor={(item, index) => item?._id}
                        data={listData}
                        renderItem={(obj) => renderItem(obj)}
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
                    />
                )}
                {/* <ScrollView>
          {listData?.length != 0 &&
            listData.map((item, index) => {
              let isCheck = item?._id === dataField?._id;
              
            })}
        </ScrollView> */}
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        width: settingApp.width,
        height: settingApp.height,
        backgroundColor: colorApp.white,
    },
    view_bt: {
        backgroundColor: colorApp.white,
        width: settingApp.width,
        minHeight: 60,
        justifyContent: "center",
    },
    bt_item: {
        backgroundColor: colorApp.white,
        width: settingApp.width,
        minHeight: 60,
        justifyContent: "center",
        paddingLeft: 16,
        paddingRight: 16,
    },
    txt_item: {
        fontSize: settingApp.size_18,
        color: colorApp.black,
        fontWeight: "600",
    },
    line: {
        width: settingApp.width,
        height: 8,
        backgroundColor: colorApp.black_opacity_01,
    },
});

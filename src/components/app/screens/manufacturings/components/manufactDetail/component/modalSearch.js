import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput
} from "react-native";
import { colorApp, lang, settingApp } from "public";
import { HeaderName } from "public/component";
import { TYPE_INPUT } from "../common";
import { debounce } from "lodash";

export default function ModalSearch(props) {
    const { listData = [], dataField = {}, onUpdateGroup, typeModal } = props || {};
    let listProp = listData
    let titleHaeder = lang.group;
    let onChangeCallback = debounce(_onChangeText, 500);

    const [listDataSearch, setListDataSearch] = useState(listData)
    const refTextinput = useRef()

    useEffect(() => {
        setListDataSearch(props?.listData)
        listProp = props?.listData
    }, [props?.listData])

    function _onChangeText(text) {
        let newList = []
        if (text?.trim().length != 0) {
            listProp.map(item => {
                if (
                    item?.name.toLowerCase().indexOf(text.toLowerCase()) != -1
                ) {
                    const index = newList.findIndex(m => m.id == item.id)
                    if (index < 0) {
                        newList.push(item)
                    }
                }
            })
        }
        else {
            newList = props?.listData
        }
        setListDataSearch(newList)
    }

    function _onUpdate(item) {
        onUpdateGroup(item)
        setListDataSearch(props?.listData)
        refTextinput?.current?.clear()
    }

    const isBank = typeModal == TYPE_INPUT.BANK_NAME
    return (
        <Modal visible={props?.isVisible} transparent={false} animationType="slide">
            <HeaderName goBack={() => props?.onClose()} title={titleHaeder} />
            {isBank && <View style={styles.view_search}>
                <TextInput
                    ref={refTextinput}
                    placeholder={"Tìm theo tên ngân hàng"}
                    onChangeText={(val) => onChangeCallback(val)}
                    style={styles.txt_input_search}
                />
            </View>
            }

            <View style={styles.container}>
                <ScrollView
                    keyboardDismissMode="on-drag"
                >
                    <View style={styles.line} />
                    {listDataSearch?.length != 0 &&
                        listDataSearch.map((item, index) => {
                            let isCheck = isBank ? false : item?.id === dataField?.id;
                            return (
                                <View style={styles.view_bt} key={index}>
                                    <TouchableOpacity
                                        onPress={() => _onUpdate(item)}
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
                                        {isBank && <Text style={styles.txt_item_fullname}>{item?.fullName}</Text>}
                                    </TouchableOpacity>
                                    <View style={styles.line} />
                                </View>
                            );
                        })}
                </ScrollView>
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
    txt_input_search: {
        width: settingApp.width_32,
        height: 36,
        backgroundColor: colorApp.black_opacity_01,
        paddingLeft: 5,
        borderRadius: 8

    },
    view_search: {
        width: settingApp.width,
        height: 45,
        paddingRight: 16,
        paddingLeft: 16
    },
    txt_item_fullname: {
        fontSize: settingApp.size_16,
        color: colorApp.green_002,
        marginTop: 5
    }
});

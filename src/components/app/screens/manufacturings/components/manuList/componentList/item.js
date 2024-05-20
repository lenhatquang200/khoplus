import React, { memo, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";
import { colorApp, lang, settingApp } from "../../../../../../../public";
import { screenName } from "router/screenName";

const { width } = settingApp;
const WIDTH_CONTENT = width - 100;

const Item = memo(({ obj, props, onDelete }) => {
    const [dataItem, setDataItem] = useState(null);

    useEffect(() => {
        const { item, index } = obj || {};
        console.log('itemmm', item);
        if (item?._id) {
            setDataItem(item);
        }
    }, [obj]);


    return (
        <TouchableOpacity
            onPress={() =>
                props?.navigation?.navigate(screenName.MANU_FACT_DETAIL, {
                    item: dataItem,
                })
            }
            style={styles.container}
        >
            <View style={styles.view_item}>
                <View style={styles.view_content}>
                    <Text style={styles.txt_name}>
                        {dataItem?.name || lang.emptyText}
                    </Text>

                    <Text style={styles.txt_code}>
                        {dataItem?.code || lang.emptyText}
                    </Text>

                    <Text style={styles.txt_groupName}>
                        {dataItem?.group?.name || lang.emptyText}
                    </Text>
                    <Text style={styles.txt_phone}>{dataItem?.phone}</Text>
                </View>

                <View style={styles.view_Action}>
                    <View />
                    <TouchableOpacity
                        onPress={() => onDelete(dataItem)}
                        style={styles.bt_delete}
                    >
                        <Text style={styles.txt_delete}>{lang.delete}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.line} />
        </TouchableOpacity>
    );
});

export default Item;
const styles = StyleSheet.create({
    container: {
        width: settingApp.width,
        minHeight: 100,
    },
    view_item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 16,
        minHeight: 100,
        paddingBottom: 8
    },
    view_content: {
        width: WIDTH_CONTENT,
        height: 80,
        paddingTop: 8,
    },
    line: {
        width: width,
        height: 8,
        backgroundColor: colorApp.black_opacity_01,
    },
    view_Action: {
        width: 60,
        height: 100,
        justifyContent: "space-between",
        paddingBottom: 8,
        paddingTop: 8,
    },
    bt_delete: {
        width: 60,
        height: 30,
        backgroundColor: colorApp.red_opacity_03,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    bt_edit: {
        width: 60,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: colorApp.green_opacity_01,
    },
    txt_delete: {
        fontSize: settingApp.size_14,
        fontWeight: "500",
        color: colorApp.red,
    },
    txt_call: {
        fontSize: settingApp.size_14,
        fontWeight: "500",
        color: colorApp.green_002,
    },
    txt_code: {
        fontSize: settingApp.size_14,
        color: colorApp.colorPlaceText,
    },
    txt_name: {
        fontSize: settingApp.size_22,
        color: colorApp.colorText,
        fontWeight: "600",
        marginBottom: 6,
    },
    txt_groupName: {
        fontSize: settingApp.size_16,
        color: colorApp.green_005,
    },
    view_phone: {
        position: "absolute",
        right: 0,
        top: 15,
    },
    txt_phone: {
        fontSize: settingApp.size_14,
        color: colorApp.colorPlaceText,
        marginTop: 8
    },
});

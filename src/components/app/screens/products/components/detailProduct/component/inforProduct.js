import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Utils, colorApp, lang, settingApp } from "public";
import { AsyncImage } from "public/component";
import { MaterialIcons } from "@expo/vector-icons"
export default function InforProduct(props) {
    const { data, _onUpdate } = props
    console.log("data", data);
    const { unit = {}, type = {}, group = {} } = data || {};
    return (
        <View style={styles.container}>
            <View style={styles.view_image_info}>
                <View>
                    <AsyncImage source={{ uri: data?.image_url }} size={120} />
                </View>

                <View style={styles.view_text_info}>
                    <Text style={styles.txt_code}>{data?.code}</Text>
                    <Text style={styles.txt_name}>{data?.name}</Text>

                    <Text style={styles.txt_type}>
                        <Text>{group?.name + " - "}</Text>
                        <Text>{type?.name}</Text>

                    </Text>


                    <Text style={styles.text_unit}>{unit?.name}</Text>
                </View>
            </View>
            <View style={styles.view_price}>
                <MaterialIcons name="attach-money" size={18} />
                <Text style={styles.txt_price}>
                    {Utils.formatMoney(data?.price_cost) || lang.emptyText}
                </Text>
            </View>
            <View style={styles.view_bt_option}>
                <TouchableOpacity
                    onPress={_onUpdate}
                    style={styles.bt_edit}
                >
                    <Text style={styles.txt_edit}>{lang.update}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: settingApp.width,
        minHeight: 120,
        backgroundColor: colorApp.white,
        padding: settingApp.space_16,
        marginTop: 5,
    },
    view_image_info: {
        width: settingApp.width,
        minHeight: 140,
        flexDirection: "row"
    },
    view_text_info: {
        width: settingApp.width_32 - 120,
        padding: 16
    },
    txt_code: {
        fontSize: settingApp.size_14,
        color: colorApp.green_007,
    },
    txt_name: {
        fontSize: settingApp.size_20,
        color: colorApp.colorText,
        fontWeight: "600",
    },
    txt_type: {
        fontSize: settingApp.size_14,
        color: colorApp.colorText,
        marginTop: 8,
        maxWidth: settingApp.width_32 - 140,
        flexWrap: "wrap"
    },
    text_unit: {
        fontSize: settingApp.size_14,
        color: colorApp.green_007,
        textTransform: "uppercase",
        fontWeight: "800",
        marginTop: 8,
    },
    view_price: {
        flexDirection: "row",
        height: 25,
        alignItems: "center",
    },
    txt_price: {
        fontSize: settingApp.size_20,
        color: colorApp.gold_002,
        fontWeight: "bold",
    },
    view_bt_option: {
        width: settingApp.width / 2,
        height: 44,
        flexDirection: "row",
        position: "absolute",
        right: 8,
        bottom: 5,
        justifyContent: "flex-end"
    },
    bt_edit: {
        minWidth: 120,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorApp.green_004,
        borderRadius: 12
    },
    txt_edit: {
        fontSize: 16,
        color: colorApp.white,
        fontWeight: "600"
    }
});
